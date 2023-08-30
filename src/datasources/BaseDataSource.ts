import { Context } from '../context.js';
import config from '../config.js';

export abstract class BaseDataSource {
    context: Context;
    readonly bucketName: string;
    readonly bucketPath: string;

    constructor(context: Context) {
        this.context = context;
        this.bucketName =
            context.auth?.organisation.s3BucketName ?? config.AWS_BUCKET_NAME;
        this.bucketPath =
            context.auth?.organisation.s3CustomPath ?? config.AWS_BUCKET_PATH;
    }
}
