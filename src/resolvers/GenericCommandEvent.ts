import { assertNonNull } from '../util/assertNonNull.js';
import { GenericCommandEventResolvers } from './types/generated.js';

const resolvers: GenericCommandEventResolvers = {
    async at({ id }, _args, { dataSources }) {
        return new Date();
        // const event = assertNonNull(await dataSources.commandChain.getById(id));
        // return event.at;
    },
    async until({ id }, _args, { dataSources }) {
        return new Date();
        // const event = assertNonNull(await dataSources.commandChain.getById(id));
        // return event.until;
    },
    async testExecution({ id }, _args, { dataSources }) {
        const event = { testExecutionId: '1234' };//assertNonNull(await dataSources.commandChain.getById(id));
        return {
            __typename: 'TestExecution',
            id: event.testExecutionId,
        };
    },
}

export default resolvers;
