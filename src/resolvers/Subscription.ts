/* eslint-disable @typescript-eslint/no-explicit-any */

import { pubsub } from '../pubsub.js';

import {
    SubscriptionResolvers,
    TestExecutionStatus,
} from './types/generated.js';

const resolvers: SubscriptionResolvers = {
    testExecutionUpdated: {
        subscribe: () =>
            pubsub.asyncIterator(
                'TEST_EXECUTION_UPDATED',
            ) as unknown as AsyncIterable<any>,
        resolve: (payload: TestExecutionStatus) => {
            return payload;
        },
    },
};

export default resolvers;
