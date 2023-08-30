import DataLoader from 'dataloader';

import S3Service from '../S3Service.js';
import mapSnapshots from '../maps/mapSnapshots.js';

import { BaseDataSource } from './BaseDatasource.js';

export class Snapshot extends BaseDataSource {
    snapshotByTestExecutionIdDataLoader = new DataLoader<
        string,
        ReturnType<typeof mapSnapshots>
    >((ids) =>
        Promise.all(
            ids
                .map(async (testExecutionId) => {
                    const snapshots = await S3Service.getObject(
                        this.bucketName,
                        `${this.bucketPath}/${testExecutionId}/snapshots/snapshot-metadata.json`,
                    );
                    const mappedSnapshots = mapSnapshots(
                        snapshots,
                        testExecutionId,
                    );
                    return mappedSnapshots;
                })
                .map((promise) => promise.catch((error) => error)),
        ),
    );
    async getSnapshotsByTestExecutionId(testExecutionId: string) {
        return this.snapshotByTestExecutionIdDataLoader.load(testExecutionId);
    }

    async getById(id: string) {
        const [runId, requestId, _] = id.split('/');
        const snapshots = await this.getSnapshotsByTestExecutionId(
            `${runId}/${requestId}`,
        );
        return snapshots[id] ?? null;
    }
}
