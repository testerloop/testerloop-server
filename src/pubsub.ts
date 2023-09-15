import { PubSub } from 'graphql-subscriptions';

export enum PubSubChannels {
    TestExecutionUpdated = 'TEST_EXECUTION_UPDATED',
    TestExecutionCreated = 'TEST_EXECUTION_CREATED',
    TestRunStatusUpdated = 'RUN_STATUS_UPDATED',
}

export const pubsub = new PubSub();
