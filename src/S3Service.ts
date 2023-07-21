import {
    GetObjectCommand,
    ListObjectsV2Command,
    S3Client,
    PutObjectCommand,
    HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { LRUCache } from 'lru-cache';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import type { Conditions } from '@aws-sdk/s3-presigned-post/dist-types/types.js';

import config from './config.js';

class S3Service {
    private s3: S3Client;
    private cache: LRUCache<string, { contents: unknown }>;

    constructor() {
        this.cache = new LRUCache<string, { contents: unknown }>({
            max: 1000,
            fetchMethod: async (cacheKey) => {
                const separatorIndex = cacheKey.indexOf('/');
                if (separatorIndex === -1) {
                    throw new Error('Invalid S3 fetch');
                }

                const bucketName = cacheKey.slice(0, separatorIndex);
                const key = cacheKey.slice(separatorIndex + 1);

                const params = { Bucket: bucketName, Key: key };
                const response = await this.s3.send(
                    new GetObjectCommand(params),
                );
                const dataString = await response?.Body?.transformToString();
                const contents = dataString ? JSON.parse(dataString) : null;

                return { contents };
            },
        });

        this.s3 = new S3Client({
            region: config.AWS_BUCKET_REGION,
            credentials: config.AWS_CREDENTIALS,
        });
    }

    async getObject(bucketName: string, key: string) {
        const cacheKey = `${bucketName}/${key}`;
        const result = await this.cache.fetch(cacheKey);
        if (!result) return null;
        return result.contents;
    }

    async getPresignedPost(
        bucketName: string,
        key: string,
        conditions: Conditions[],
        expires: number = 3600,
    ) {
        const { url, fields: presignedFields } = await createPresignedPost(
            this.s3,
            {
                Bucket: bucketName,
                Key: key,
                Conditions: conditions,
                Expires: expires,
            },
        );

        return { url, fields: presignedFields };
    }

    async listSubFolders(bucketName: string, prefix: string) {
        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix,
            Delimiter: '/',
        });
        const response = await this.s3.send(command);
        const objects = response.CommonPrefixes?.map((object) => object.Prefix)
            .filter((x: string | undefined): x is string => !!x)
            .map((folder) => {
                if (!folder.startsWith(prefix))
                    throw new Error('Folder path found in sub-folder!');
                if (!folder.endsWith('/'))
                    throw new Error('Sub-folder does not end with a "/"!');
                return folder.slice(prefix.length, -1);
            });
        return objects || [];
    }

    async listObjects(bucketName: string, prefix: string) {
        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix,
        });
        const response = await this.s3.send(command);
        const objects = response.Contents?.map((object) => object.Key || '');
        return objects || [];
    }

    async getSignedUrl(
        bucketName: string,
        key: string,
        expiresIn = config.EXPIRES_IN,
    ) {
        const params = { Bucket: bucketName, Key: key };

        const command = new GetObjectCommand(params);
        const expiresAt = new Date(Date.now() + expiresIn * 1000);
        const url = await getSignedUrl(this.s3, command, { expiresIn });

        return { url, expiresAt };
    }

    async doesFileExist(bucketName: string, key: string) {
        try {
            await this.s3.send(
                new HeadObjectCommand({
                    Bucket: bucketName,
                    Key: key,
                }),
            );
            return true;
        } catch (error) {
            return false;
        }
    }

    async putObject(bucketName: string, key: string, data: string) {
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: data,
            ContentType: 'application/json',
        });

        return await this.s3.send(command);
    }
}

export default new S3Service();
