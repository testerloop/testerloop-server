import DataLoader from 'dataloader';
import { Context } from '../context.js';
import config from '../config.js';
import S3Service from '../S3Service.js';
import mapLogs from '../maps/mapLogs.js';

export class ConsoleEvent {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    logByTestExecutionIdDataLoader = new DataLoader<string, ReturnType<typeof mapLogs>>(
        (ids) => Promise.all(ids.map(async (testExecutionId) => {
            const bucketName = config.AWS_BUCKET_NAME;
            const logs = await S3Service.getObject(bucketName, `${testExecutionId}/console/console-logs.txt`) as string[];
            const mappedLogs = mapLogs(logs, testExecutionId);
            return mappedLogs;
        }))
    )
    async getLogsByTestExecutionId(testExecutionId: string) {
        return this.logByTestExecutionIdDataLoader.load(testExecutionId);
    }

    async getById(id: string) {
        const [runId, requestId, _] = id.split('/');
        const logs = await this.getLogsByTestExecutionId(`${runId}/${requestId}`);
        return logs[id] ?? null;
    }
}
