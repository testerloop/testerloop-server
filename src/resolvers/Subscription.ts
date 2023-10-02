import { withFilter } from 'graphql-subscriptions';

import { pubsubClient, PubSubChannels } from '../pubsub.js';

import { SubscriptionResolvers } from './types/generated.js';

const resolvers = {
    testExecutionUpdated: {
        subscribe: withFilter(
            () =>
                pubsubClient.asyncIterator(PubSubChannels.TestExecutionUpdated),
            async (payload, variables, { auth, repository }) => {
                const { id } = payload;

                if (id !== variables.id) {
                    return false;
                }

                return repository.testExecution.isOwnedByOrganisation(
                    id,
                    auth.organisation.id,
                );
            },
        ),
        resolve: async (payload: { id: string; runId: string; at: Date }) => {
            const { id, runId, at } = payload;

            return {
                __typename: 'TestExecutionStatusUpdatedEvent',
                at,
                testExecution: {
                    __typename: 'TestExecution',
                    id,
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
            pubsubClient.asyncIterator(PubSubChannels.TestExecutionCreated),
        resolve: async (payload: { id: string; runId: string; at: Date }) => {
            const { id, runId, at } = payload;

            return {
                __typename: 'TestExecutionCreatedEvent',
                at,
                testExecution: {
                    __typename: 'TestExecution',
                    id,
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
            pubsubClient.asyncIterator(PubSubChannels.TestRunStatusUpdated),
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
