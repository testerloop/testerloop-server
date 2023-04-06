import { Context } from '../context.js';
import config from '../config.js';
import S3Service from '../S3Service.js';
import mapLogs from '../maps/mapLogs.js';


export const getLogs = async (testExecutionId: string) => {
    const bucketName = config.AWS_BUCKET_NAME;
    const [runId, requestId] = testExecutionId.split('/');

    const logs = await S3Service.getObject(bucketName, `${runId}/${requestId}/console/console-logs.txt`) as string[];
    const mappedLogs = mapLogs(logs, testExecutionId);

    return mappedLogs;
}
export class ConsoleEvent {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async getById(id: string) {
        const [runId, requestId, _] = id.split('/');
        const logs = await getLogs(`${runId}/${requestId}`);
        return logs[id] ?? null;
    }
}
