import DataLoader from 'dataloader';

import mapNetworkEvents from '../maps/mapNetworkEvents.js';
import S3Service from '../S3Service.js';

import { BaseDataSource } from './BaseDataSource.js';

export class NetworkEvent extends BaseDataSource {
    networkEventsByTestExecutionIdDataLoader = new DataLoader<
        string,
        ReturnType<typeof mapNetworkEvents>
    >((ids) =>
        Promise.all(
            ids
                .map(async (testExecutionId) => {
                    const events = await S3Service.getObject(
                        this.bucketName,
                        `${this.bucketPath}/${testExecutionId}/har/network-events.har`,
                    );
                    const mappedEvents = mapNetworkEvents(
                        events,
                        testExecutionId,
                    );
                    return mappedEvents;
                })
                .map((promise) => promise.catch((error) => error)),
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
