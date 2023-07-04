import DataLoader from 'dataloader';
import { Context } from '../context.js';
import config from '../config.js';
import S3Service from '../S3Service.js';

export class CreateRun {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    createRunDataLoader = new DataLoader<
        { customerPath: string; runID: string },
        { url: string; fields: { key: string; value: string }[] }
    >(async (keys) => {
        const bucketName = config.AWS_BUCKET_NAME;

        return Promise.all(
            keys.map(async ({ customerPath, runID }) => {
                const key = `${customerPath}/${runID}`;
                const conditions = [['starts-with', '$key', key]];
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

    async createRun(customerPath: string, runID: string) {
        return this.createRunDataLoader.load({ customerPath, runID });
    }
}
