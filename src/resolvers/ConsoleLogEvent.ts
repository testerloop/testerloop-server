import { assertNonNull } from '../util/assertNonNull.js';
import { ConsoleLogEventResolvers } from './types/generated.js';

const resolvers: ConsoleLogEventResolvers = {
    async at({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.consoleEvent.getById(id));
        return event.at;
    },
    async logLevel({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.consoleEvent.getById(id));
        return event.logLevel;
    },
    async message({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.consoleEvent.getById(id));
        return event.message;
    },
    async testExecution({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.consoleEvent.getById(id));
        const [runId, _] = id.split('/');
        return {
            __typename: 'TestExecution',
            id: event.testExecutionId,
            testRun: {
                __typename: 'TestRun',
                id: runId
            }
        };
    },
}

export default resolvers;
