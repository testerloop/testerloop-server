import { PubSub as GraphQLPubSub } from 'graphql-subscriptions';

export enum PubSubChannels {
    TestExecutionUpdated = 'TEST_EXECUTION_UPDATED',
    TestExecutionCreated = 'TEST_EXECUTION_CREATED',
    TestRunStatusUpdated = 'RUN_STATUS_UPDATED',
}

export const pubsubClient = new GraphQLPubSub();

const pubsub = {
    publishTestExecutionCreated: (testExecutionId: string, runID: string) => {
        const timestamp = new Date();
        pubsubClient.publish(PubSubChannels.TestExecutionCreated, {
            id: testExecutionId,
            runId: runID,
            at: timestamp,
        });
    },

    publishTestExecutionUpdated: (testExecutionId: string, runID: string) => {
        const timestamp = new Date();
        pubsubClient.publish(PubSubChannels.TestExecutionUpdated, {
            id: testExecutionId,
            runId: runID,
            at: timestamp,
        });
    },

    publishTestRunStatusUpdated: (runId: string) => {
        const timestamp = new Date();
        pubsubClient.publish(PubSubChannels.TestRunStatusUpdated, {
            id: runId,
            at: timestamp,
        });
    },
};

export default pubsub;
