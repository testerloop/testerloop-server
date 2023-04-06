import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import config from './config.js';
import LRUCache from 'lru-cache';

class S3Service {
  private s3: S3Client;
  private cache: LRUCache<string, { contents: unknown }>;

  constructor() {
    this.cache = new LRUCache<string, { contents: unknown }>({
      max: 1000,
      fetchMethod: async (cacheKey) => {
        console.log(`Fetching uncached key ${cacheKey}`)
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
}

export default new S3Service();

