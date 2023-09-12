/* eslint-disable @typescript-eslint/no-explicit-any */

import repository from '../repository/index.js';
import { pubsub } from '../pubsub.js';

import {
    SubscriptionResolvers,
    TestExecution,
    TestExecutionUpdatedEvent,
} from './types/generated.js';

const resolvers: SubscriptionResolvers = {
    testExecutionUpdated: {
        subscribe: () =>
            pubsub.asyncIterator(
                'TEST_EXECUTION_UPDATED',
            ) as unknown as AsyncIterable<any>,
        resolve: async (payload: any): Promise<TestExecutionUpdatedEvent> => {
            const testExecution =
                await repository.testExecution.getTestExecutionById(
                    payload.testExecutionId,
                );

            if (!testExecution) {
                throw new Error('Test Execution not found');
            }

            return {
                __typename: 'TestExecutionUpdatedEvent',
                testExecution: testExecution as unknown as TestExecution,
            };
        },
    },
};

export default resolvers;
