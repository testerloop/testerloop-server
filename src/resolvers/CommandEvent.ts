import { assertNonNull } from '../util/assertNonNull.js';
import { encodeId } from '../util/id.js';
import { CommandEventResolvers, CommandEventStatus } from './types/generated.js';

const resolvers: CommandEventResolvers = {
    async id({ id }, _args) {
        return encodeId('CommandEvent', id);
    },
    async at({ id }, _args, { dataSources }) {
        return new Date()
    },
    async until({ id }, _args, { dataSources }) {
        return new Date()
    },
    async name({ id }, _args, { dataSources }) {
        return 'command name'
    },
    async description({ id }, _args, { dataSources }) {
        return 'command description'
    },
    async status({ id }, _args, { dataSources }) {
        return CommandEventStatus.Failed
    },
    async error({ id }, _args, { dataSources }) {
        return {
            __typename: 'CommandEventError',
            type: 'type',
            message: 'msg',
            stackTrace: 'stacktrace'
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
