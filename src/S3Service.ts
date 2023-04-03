import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import config from './config.js';
import LRUCache from 'lru-cache';

class S3Service {
  private s3: S3Client;
  private cache: LRUCache<string, any>;

  constructor() {
    this.cache = new LRUCache<string, any>({
      max: 1000,
      fetch: async (cacheKey: string) => {
        const [bucketName, key] = cacheKey.split('/');
    
        const params = { Bucket: bucketName, Key: key };
        const response = await this.s3.send(new GetObjectCommand(params));
        const dataString = await response?.Body?.transformToString();
        const data = dataString ? JSON.parse(dataString) : undefined;

        return data;
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

  async getData(bucketName: string, key: string) {
    const cacheKey = `${bucketName}/${key}`;
    return this.cache.get(cacheKey);
  }
}

export default new S3Service();

