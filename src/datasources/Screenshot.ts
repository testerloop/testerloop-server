import DataLoader from 'dataloader';
import { Context } from '../context.js';
import config from '../config.js';
import S3Service from '../S3Service.js';
import mapScreenshots from '../maps/mapScreenshots.js';

export class Screenshot {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    screenshotByTestExecutionIdDataLoader = new DataLoader<string, ReturnType<typeof mapScreenshots>>(
        (ids) => Promise.all(ids.map(async (testExecutionId) => {
            const bucketName = config.AWS_BUCKET_NAME;
            const bucketPath = config.AWS_BUCKET_PATH || '';
            const screenshots = await S3Service.listObjects(bucketName, `${bucketPath}${testExecutionId}/screenshots/`);
            return mapScreenshots(screenshots, testExecutionId)
        }))
    )
    async getScreenshotsByTestExecutionId(testExecutionId: string) {
        return this.screenshotByTestExecutionIdDataLoader.load(testExecutionId);
    }

    async getById(id: string) {
        const [runId, requestId, _] = id.split('/');
        const screenshots = await this.getScreenshotsByTestExecutionId(`${runId}/${requestId}`);
        return screenshots[id] ?? null;
    }
}
