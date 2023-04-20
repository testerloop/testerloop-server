import { S3Client, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import {
  getSignedUrl,
} from "@aws-sdk/s3-request-presigner";
import config from './config.js';
import LRUCache from 'lru-cache';

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
        const response = await this.s3.send(new GetObjectCommand(params));
        const dataString = await response?.Body?.transformToString();
        const contents = dataString ? JSON.parse(dataString) : null;

        return { contents };
      }
    });

    this.s3 = new S3Client({
      region: config.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        sessionToken: config.AWS_SESSION_TOKEN
      },
    });
  }

  async getObject(bucketName: string, key: string) {
      const cacheKey = `${bucketName}/${key}`;
      const result = await this.cache.fetch(cacheKey);
      if (!result)
        return null;
      return result.contents;
  }

  async listObjects(bucketName: string, prefix: string) {
    const command = new ListObjectsV2Command({ Bucket: bucketName, Prefix: prefix });
    const response = await this.s3.send(command);
    const objects = response.Contents?.map((object) =>
      object.Key || ''
    );
    return objects || [];
  }

  async getSignedUrl(bucketName: string, key: string, expiresIn = 3600) {
    const params = { Bucket: bucketName, Key: key };

    const command = new GetObjectCommand(params);
    const expiresAt = new Date(Math.floor(Date.now() / 1000) + expiresIn);
    const url = await getSignedUrl(this.s3, command, { expiresIn });

    return { url, expiresAt };
  }
}

export default new S3Service();

