import getPaginatedData from '../util/getPaginatedData.js';
import { CommandChainResolvers } from './types/generated.js';

const resolvers: CommandChainResolvers = {
    at: ({ at }) => at,
    until: ({ until }) => until,
    commands: ({ commands }) => getPaginatedData(commands),
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
