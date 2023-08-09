import DataLoader from 'dataloader';

import { Context } from '../context.js';
import config from '../config.js';
import mapNetworkEvents from '../maps/mapNetworkEvents.js';
import S3Service from '../S3Service.js';

const bucketName = config.AWS_BUCKET_NAME;
const bucketPath = config.AWS_BUCKET_PATH;

export class NetworkEvent {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    networkEventsByTestExecutionIdDataLoader = new DataLoader<
        string,
        ReturnType<typeof mapNetworkEvents>
    >((ids) =>
        Promise.all(
            ids.map(async (testExecutionId) => {
                const events = await S3Service.getObject(
                    bucketName,
                    `${bucketPath}${testExecutionId}/har/network-events.har`,
                );
                const mappedEvents = mapNetworkEvents(events, testExecutionId);

                return mappedEvents;
            }),
        ),
    );
    async getNetworkEventsByTestExecutionId(testExecutionId: string) {
        return this.networkEventsByTestExecutionIdDataLoader.load(
            testExecutionId,
        );
    }

    async getById(id: string) {
        const [runId, requestId, _] = id.split('/');
        const events = await this.getNetworkEventsByTestExecutionId(
            `${runId}/${requestId}`,
        );
        return events[id] ?? null;
    }
}
