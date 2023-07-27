import DataLoader from 'dataloader';

import { Context } from '../context.js';
import S3Service from '../S3Service.js';

export class CreateTestExecution {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    createFolderDataLoader = new DataLoader<
        {
            s3BucketName: string;
            customerPath: string;
            runID: string;
            testID: string;
        },
        void
    >(async (keys) => {
        return Promise.all(
            keys.map(async ({ s3BucketName, customerPath, runID, testID }) => {
                const key = `${customerPath}/${runID}/${testID}`;
                await S3Service.createFolder(s3BucketName, key);
            }),
        );
    });

    async createFolder(
        s3BucketName: string,
        customerPath: string,
        runID: string,
        testID: string,
    ) {
        return this.createFolderDataLoader.load({
            s3BucketName,
            customerPath,
            runID,
            testID,
        });
    }
}
