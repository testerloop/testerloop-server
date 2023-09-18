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

                return hasPermission;
            },
        ),
        resolve: async (payload: { id: string; runId: string; at: Date }) => {
            const { id, runId, at } = payload;

            return {
                __typename: 'TestExecutionStatusUpdatedEvent',
                at,
                testExecution: {
                    __typename: 'TestExecution',
                    id: `${runId}/${id}`,
                    testRun: {
                        __typename: 'TestRun',
                        id: runId,
                    },
                },
            };
        },
    },
    testExecutionCreated: {
        subscribe: () =>
            pubsub.asyncIterator(PubSubChannels.TestExecutionCreated),
        resolve: async (payload: { id: string; runId: string; at: Date }) => {
            const { id, runId, at } = payload;

            return {
                __typename: 'TestExecutionCreatedEvent',
                at,
                testExecution: {
                    __typename: 'TestExecution',
                    id: `${runId}/${id}`,
                    testRun: {
                        __typename: 'TestRun',
                        id: runId,
                    },
                },
            };
        },
    },
    testRunStatusUpdated: {
        subscribe: () =>
            pubsub.asyncIterator(PubSubChannels.TestRunStatusUpdated),
        resolve: async (payload: { id: string; at: Date }) => {
            const { id, at } = payload;
            return {
                __typename: 'TestRunStatusUpdatedEvent',
                at,
                testRun: {
                    __typename: 'TestRun',
                    id,
                },
            };
        },
    },
} as unknown as SubscriptionResolvers;

export default resolvers;
