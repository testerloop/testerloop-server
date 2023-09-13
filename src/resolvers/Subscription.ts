/* eslint-disable @typescript-eslint/no-explicit-any */
import { pubsub } from '../pubsub.js';
import repository from '../repository/index.js';

import { SubscriptionResolvers } from './types/generated.js';
import { TestExecutionEdgeModel } from './types/mappers.js';

const resolvers: SubscriptionResolvers = {
    testExecutionUpdated: {
        subscribe: () =>
            pubsub.asyncIterator(
                'TEST_EXECUTION_UPDATED',
            ) as unknown as AsyncIterable<any>,
        resolve: async (payload: {
            testExecutionId: string;
        }): Promise<TestExecutionEdgeModel> => {
            const testExecution =
                await repository.testExecution.getTestExecutionById(
                    payload.testExecutionId,
                );

            if (!testExecution) {
                throw new Error(
                    `TestExecution with ID ${payload.testExecutionId} not found`,
                );
            }

            const cursor = payload.testExecutionId;

            return {
                cursor,
                node: {
                    ...testExecution,
                    __typename: 'TestExecution',
                    testRun: {
                        __typename: 'TestRun',
                        id: testExecution.testRunId,
                    },
                },
            };
        },
    },
};

export default resolvers;
