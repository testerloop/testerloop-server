/* eslint-disable @typescript-eslint/no-explicit-any */
import { pubsub } from '../pubsub.js';
import { encodeId } from '../util/id.js';

import { SubscriptionResolvers } from './types/generated.js';

const resolvers: SubscriptionResolvers = {
    testExecutionUpdated: {
        subscribe: () =>
            pubsub.asyncIterator(
                'TEST_EXECUTION_UPDATED',
            ) as unknown as AsyncIterable<any>,
        resolve: async (payload: { id: string; runId: string; at: Date }) => {
            const { id, runId, at } = payload;
            return {
                __typename: 'TestExecutionStatusUpdatedEvent' as const,
                at,
                testExecution: {
                    __typename: 'TestExecution' as const,
                    id: encodeId('TestExecution', id),
                    testRun: {
                        __typename: 'TestRun' as const,
                        id: encodeId('TestRun', runId),
                    },
                },
            };
        },
    },
};

export default resolvers;
