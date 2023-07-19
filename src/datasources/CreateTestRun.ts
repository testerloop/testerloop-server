import DataLoader from 'dataloader';
import { Context } from '../context.js';
import S3Service from '../S3Service.js';

export class CreateTestRun {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    createTestRunDataLoader = new DataLoader<
        { s3BucketName: string; customerPath: string; runID: string },
        { url: string; fields: { key: string; value: string }[] }
    >(async (keys) => {
        return Promise.all(
            keys.map(async ({ s3BucketName, customerPath, runID }) => {
                const bucketName = s3BucketName;
                const keyPrefix = `${customerPath}/${runID}/`;
                const key = `${keyPrefix}${'${filename}'}`;
                const conditions = [['starts-with', '$key', keyPrefix]];
                const { url, fields } = await S3Service.getPresignedPost(
                    bucketName,
                    key,
                    conditions
                );
                const formattedFields = Object.entries(fields).map(
                    ([key, value]) => {
                        return {
                            key,
                            value: String(value),
                        };
                    }
                );

                return {
                    __typename: 'UploadInfo',
                    url,
                    fields: formattedFields,
                };
            })
        );
    });

    async getUploadLink(
        s3BucketName: string,
        customerPath: string,
        runID: string
    ) {
        return this.createTestRunDataLoader.load({
            s3BucketName,
            customerPath,
            runID,
        });
    }
    async uploadCICDFileToS3(
        s3BucketName: string,
        customerPath: string,
        runID: string,
        cicdJson: string
    ) {
        const key = `${customerPath}/${runID}/logs/cicd.json`;
        await S3Service.putObject(s3BucketName, key, cicdJson);
    }
}
