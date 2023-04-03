import mapNetworkEvents from '../maps/mapNetworkEvents.js';
import S3Service from '../S3Service.js';

export const getNetworkEvents = async (testExecutionId: string) => {
    const bucketName = 'otf-lambda-results';
    const [runId, requestId] = testExecutionId.split('/');

    const events = await S3Service.getData(bucketName, `${runId}/${requestId}/har/network-events.har`)
    const mappedEvents = mapNetworkEvents(events, testExecutionId);

    return mappedEvents;
}

export class NetworkEvent {
    async getById(id: string) {
        const [runId, requestId, _] = id.split('/');
        const events = await getNetworkEvents(`${runId}/${requestId}`);
        return events[id] ?? null;
    }
}
