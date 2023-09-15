/* eslint-disable @typescript-eslint/no-explicit-any */
import { pubsub, PubSubChannels } from '../pubsub.js';

import { SubscriptionResolvers } from './types/generated.js';

const resolvers: SubscriptionResolvers = {
    testExecutionUpdated: {
        subscribe: () =>
            pubsub.asyncIterator(
                PubSubChannels.TestExecutionUpdated,
            ) as unknown as AsyncIterable<any>,
        resolve: async (payload: { id: string; runId: string; at: Date }) => {
            const { id, runId, at } = payload;

            return {
                __typename: 'TestExecutionStatusUpdatedEvent' as const,
                at,
                testExecution: {
                    __typename: 'TestExecution' as const,
                    id: `${runId}/${id}`,
                    testRun: {
                        __typename: 'TestRun' as const,
                        id: runId,
                    },
                },
            };
        },
    },
    testExecutionCreated: {
        subscribe: () =>
            pubsub.asyncIterator(
                PubSubChannels.TestExecutionCreated,
            ) as unknown as AsyncIterable<any>,
        resolve: async (payload: { id: string; runId: string; at: Date }) => {
            const { id, runId, at } = payload;

            return {
                __typename: 'TestExecutionCreatedEvent' as const,
                at,
                testExecution: {
                    __typename: 'TestExecution' as const,
                    id: `${runId}/${id}`,
                    testRun: {
                        __typename: 'TestRun' as const,
                        id: runId,
                    },
                },
            };
        },
    },
    testRunStatusUpdated: {
        subscribe: () =>
            pubsub.asyncIterator(
                PubSubChannels.TestRunStatusUpdated,
            ) as unknown as AsyncIterable<any>,
        resolve: async (payload: { id: string; at: Date }) => {
            const { id, at } = payload;
            return {
                __typename: 'TestRunStatusUpdatedEvent' as const,
                at,
                testRun: {
                    __typename: 'TestRun' as const,
                    id,
                },
            };
        },
    },
};

export default resolvers;
