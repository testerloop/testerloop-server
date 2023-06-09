import { assertNonNull } from '../util/assertNonNull.js';
import { ConsoleLogEventResolvers, ConsoleLogLevel } from './types/generated.js';
import { encodeId } from '../util/id.js';
const resolvers: ConsoleLogEventResolvers = {
    id({ id }) {
        return encodeId('ConsoleLogEvent', id);
    },
    async at({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.consoleEvent.getById(id));
        return event.timestamp;
    },
    async logLevel({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.consoleEvent.getById(id));

        switch (event.type) {
            case 'debug':
            case 'log':
                return ConsoleLogLevel.Log;
            case 'info':
                return ConsoleLogLevel.Info;
            case 'warning':
                return ConsoleLogLevel.Warn;
            case 'error':
                return ConsoleLogLevel.Error;
        }
    },
    async message({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.consoleEvent.getById(id));
        if (event.args.length !== 1)
            throw new Error(
                'Console event could not be serialized to a message.'
            );

        switch (event.args[0].type) {
            case 'undefined':
                return 'undefined';
            case 'string':
            case 'boolean':
                return String(event.args[0].value);
            case 'object':
                return 'An object was logged, but Testerloop does not yet support displaying objects.';
            default:
                throw new Error(
                    'Console event could not be serialized to a message.'
                );
        }
    },

    async stackTrace({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.consoleEvent.getById(id));
        return {
            __typename: 'StackTrace',
            id: id,
        };
    },
    async testExecution({ id }, _args, { dataSources }) {
        const [runId, testExecutionId] = id.split('/');
        return {
            __typename: 'TestExecution',
            id: `${runId}/${testExecutionId}`,
            testRun: {
                __typename: 'TestRun',
                id: runId,
            },
        };
    },
};

export default resolvers;
