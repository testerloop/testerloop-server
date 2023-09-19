import { PubSub } from 'graphql-subscriptions';

export enum PubSubChannels {
    TestExecutionUpdated = 'TEST_EXECUTION_UPDATED',
    TestExecutionCreated = 'TEST_EXECUTION_CREATED',
    TestRunStatusUpdated = 'RUN_STATUS_UPDATED',
}

type PublishPayload = {
    id: string;
    runId?: string;
};

export const publishEvent = (
    channel: PubSubChannels,
    payload: PublishPayload,
): void => {
    pubsub.publish(channel, { ...payload, at: new Date() });
};

export const pubsub = new PubSub();
