/* eslint-disable @typescript-eslint/no-explicit-any */

import { TestExecution as PrismaTestExecution } from '@prisma/client';

import { pubsub } from '../pubsub.js';

import { SubscriptionResolvers, TestExecution } from './types/generated.js';

const resolvers: SubscriptionResolvers = {
    testExecutionUpdated: {
        subscribe: () =>
            pubsub.asyncIterator(
                'TEST_EXECUTION_UPDATED',
            ) as unknown as AsyncIterable<any>,
        resolve: (payload: PrismaTestExecution) => {
            return {
                __typename: 'TestExecutionUpdatedEvent' as const,
                testExecution: {
                    __typename: 'TestExecution',
                    status: payload.result,
                    ...payload,
                } as unknown as TestExecution,
            };
        },
    },
};

export default resolvers;
