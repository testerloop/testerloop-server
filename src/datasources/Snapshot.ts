import DataLoader from 'dataloader';
import { Context } from '../context.js';
import config from '../config.js';
import S3Service from '../S3Service.js';
import mapSnapshots from '../maps/mapSnapshots.js';

export class Snapshot {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    snapshotByTestExecutionIdDataLoader = new DataLoader<string, ReturnType<typeof mapSnapshots>>(
        (ids) => Promise.all(ids.map(async (testExecutionId) => {
            const bucketName = config.AWS_BUCKET_NAME;
            const bucketPath = config.AWS_BUCKET_PATH || '';
            const snapshots = await S3Service.getObject(bucketName, `${bucketPath}${testExecutionId}/snapshots/snapshot-metadata.json`);
            const mappedSnapshots = mapSnapshots(snapshots, testExecutionId);
            return mappedSnapshots;
        }))
    )
    async getSnapshotsByTestExecutionId(testExecutionId: string) {
        return this.snapshotByTestExecutionIdDataLoader.load(testExecutionId);
    }

    async getById(id: string) {
        const [runId, requestId, _] = id.split('/');
        const snapshots = await this.getSnapshotsByTestExecutionId(`${runId}/${requestId}`);
        return snapshots[id] ?? null;
    }
}
