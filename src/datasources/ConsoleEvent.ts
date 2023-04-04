import S3Service from '../S3Service.js';
import mapLogs from '../maps/mapLogs.js';


export const getLogs = async (testExecutionId: string) => {
    const bucketName = 'otf-lambda-results';
    const [runId, requestId] = testExecutionId.split('/');

    const logs = await S3Service.getObject(bucketName, `${runId}/${requestId}/console/console-logs.txt`);
    
    const mappedLogs = mapLogs(logs, testExecutionId);

    return mappedLogs;
}
export class ConsoleEvent {
    async getById(id: string) {
        const [runId, requestId, _] = id.split('/');
        const logs = await getLogs(`${runId}/${requestId}`);
        return logs[id] ?? null;
    }
}
