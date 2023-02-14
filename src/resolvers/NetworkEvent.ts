import { assertNonNull } from '../util/assertNonNull.js';
import { encodeId } from '../util/id.js';
import { NetworkEventResolvers } from './types/generated.js';

const resolvers: NetworkEventResolvers = {
    id({ id }) {
        return encodeId('NetworkEvent', id);
    },
    async log({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.networkEvent.getById(id));
        return event.log;
    },
    async testExecution({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.networkEvent.getById(id));
        return {
            __typename: 'TestExecution',
            id: event.testExecutionId,
        };
    },
}

export default resolvers;
