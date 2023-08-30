import DataLoader from 'dataloader';

import S3Service from '../S3Service.js';
import mapScreenshots from '../maps/mapScreenshots.js';

import { BaseDataSource } from './BaseDatasource.js';

export class Screenshot extends BaseDataSource {
    screenshotByTestExecutionIdDataLoader = new DataLoader<
        string,
        ReturnType<typeof mapScreenshots>
    >((ids) =>
        Promise.all(
            ids
                .map(async (testExecutionId) => {
                    const screenshots = await S3Service.listObjects(
                        this.bucketName,
                        `${this.bucketPath}/${testExecutionId}/screenshots/`,
                    );
                    return mapScreenshots(screenshots, testExecutionId);
                })
                .map((promise) => promise.catch((error) => error)),
        ),
    );
    async getScreenshotsByTestExecutionId(testExecutionId: string) {
        return this.screenshotByTestExecutionIdDataLoader.load(testExecutionId);
    }

    async getById(id: string) {
        const [runId, requestId, _] = id.split('/');
        const screenshots = await this.getScreenshotsByTestExecutionId(
            `${runId}/${requestId}`,
        );
        return screenshots[id] ?? null;
    }
}
