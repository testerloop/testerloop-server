import { pubsub } from '../pubsub.js';

import { SubscriptionResolvers } from './types/generated.js';
import { SET_TEST_EXECUTION_STATUS } from './Mutation.js';

const resolvers: SubscriptionResolvers = {
    testExecutionStatusUpdated: {
        subscribe: () =>
            pubsub.asyncIterator([
                SET_TEST_EXECUTION_STATUS,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ]) as unknown as AsyncIterable<any>,
    },
};

export default resolvers;
