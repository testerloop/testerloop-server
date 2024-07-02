import {
    S3Client,
    GetObjectCommand,
    ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { LRUCache } from 'lru-cache';

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
            endpoint: 'http://localhost:4566',
            forcePathStyle: true,
        });
    }

    async getObject(bucketName: string, key: string) {
        const cacheKey = `${bucketName}/${key}`;
        const result = await this.cache.fetch(cacheKey);
        if (!result) return null;
        return result.contents;
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

    async listObjectsWithDate(bucketName: string, prefix: string) {
        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix,
        });
        const response = await this.s3.send(command);
        const objects = response.Contents?.filter(
            (object) => object.Key !== undefined || object.Key !== '',
        ).map((object) => ({
            fileName: object.Key || '',
            lastRun: object.LastModified || '',
        }));

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
}

export default new S3Service();
