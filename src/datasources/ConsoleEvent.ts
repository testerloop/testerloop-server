import S3Service from '../S3Service.js';
import mapLogs from '../util/mapLogs.js';


export const getLogs = async (requestId: string) => {
    const bucketName = 'otf-lambda-results';
    const runId = 'd7a674e5-9726-4c62-924b-0bb846e9f213';

    const logs = await S3Service.getObject(bucketName, `${runId}/${requestId}/console/console-logs.txt`)
    
    const mappedLogs = mapLogs(logs, runId, requestId);

    return mappedLogs;
}
export class ConsoleEvent {
    async getById(id: string) {
        const requestId = '00343af4-acf3-473b-9975-0c2bd26e47o1';
        const logs = await getLogs(requestId);
        return logs[id] ?? null;
    }
}
