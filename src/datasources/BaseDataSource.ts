import { Context } from '../context.js';

export abstract class BaseDataSource {
    context: Context;
    readonly bucketName: string;
    readonly bucketPath: string;

    constructor(context: Context) {
        this.context = context;
        if (!context.auth?.organisation) {
            throw new Error('Missing organisation');
        }
        this.bucketName = context.auth?.organisation.s3BucketName;
        this.bucketPath = context.auth?.organisation.s3CustomPath;
    }
}
