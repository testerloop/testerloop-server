import { Context } from '../context.js';
import config from '../config.js';
import mapNetworkEvents from '../maps/mapNetworkEvents.js';
import S3Service from '../S3Service.js';

export const getNetworkEvents = async (testExecutionId: string) => {
    const bucketName = config.AWS_BUCKET_NAME;
    const [runId, requestId] = testExecutionId.split('/');

    const events = await S3Service.getObject(bucketName, `${runId}/${requestId}/har/network-events.har`);
    const mappedEvents = mapNetworkEvents(events, testExecutionId);

    return mappedEvents;
}

export class NetworkEvent {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async getById(id: string) {
        const [runId, requestId, _] = id.split('/');
        const events = await getNetworkEvents(`${runId}/${requestId}`);
        return events[id] ?? null;
    }
}
