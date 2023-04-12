import { assertNonNull } from '../util/assertNonNull.js';
import { CommandChainResolvers } from './types/generated.js';

const resolvers: CommandChainResolvers = {
    async at({ id }, _args, { dataSources }) {
        return new Date()
    },
    async until({ id }, _args, { dataSources }) {
        return new Date()
    },
    async commands({ id }, _args, { dataSources }) {
        // return dataSources.commandEvent.getById(id);
        return {
            __typename: 'CommandEventConnection',
            totalCount: 1,
            hasNextPage: false,
            hasPreviousPage: false,
            edges: [{node: {__typename: 'CommandEvent', id: '1'}, cursor: '1'}]
        }
    },
    async testExecution({ id }, _args) {
        const [runId, _] = id.split('/');
        return {
            __typename: 'TestExecution',
            id,
            testRun: {
                __typename: 'TestRun',
                id: runId
            }
        };
    },
}

export default resolvers;
