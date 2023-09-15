/* eslint-disable @typescript-eslint/no-explicit-any */
import { withFilter } from 'graphql-subscriptions';

import { pubsub, PubSubChannels } from '../pubsub.js';

import { SubscriptionResolvers } from './types/generated.js';

const resolvers = {
    testExecutionUpdated: {
        subscribe: withFilter(
            () => pubsub.asyncIterator(PubSubChannels.TestExecutionUpdated),
            async (payload, variables, { auth, repository }) => {
                const { id } = payload;

                if (id !== variables.id) {
                    return false;
                }

                const hasPermission =
                    await repository.testExecution.isOwnedByOrganisation(
                        id,
                        auth.organisation.id,
                    );

                if (!hasPermission) {
                    console.log('Not owned by organisation');
                }

                return hasPermission;
            },
        ),
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
} as unknown as SubscriptionResolvers;

export default resolvers;
