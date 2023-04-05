import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import config from './config.js';

class S3Service {
  private s3: S3Client;

  constructor() {
    
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
      const params = { Bucket: bucketName, Key: key };
      const response = await this.s3.send(new GetObjectCommand(params));
      const dataString = await response?.Body?.transformToString();
      const data = dataString ? JSON.parse(dataString) : undefined;
      return data;
  }
}

export default new S3Service();

