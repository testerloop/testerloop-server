import { assertNonNull } from '../util/assertNonNull.js';
import { ConsoleLogEventResolvers, ConsoleLogLevel } from './types/generated.js';

const resolvers: ConsoleLogEventResolvers = {
    id: ({ id }) => id,
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
            throw new Error('Console event could not be serialized to a message.');

        if (event.args[0].type === 'undefined')
            return 'undefined';

        if (event.args[0].type !== 'string')
            throw new Error('Console event could not be serialized to a message.');
        return event.args[0].value;
    },
    async stackTrace({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.consoleEvent.getById(id));
        const callFrames = event.stackTrace.callFrames.map((callFrame, idx) => ({
            __typename: 'CallFrame' as const,
            id: `${event.id}-stack-${idx}`,
            ...callFrame,
        }));
        return {
            __typename: 'StackTrace',
            id: `${event.id}-stack`,
            callFrames: callFrames,
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
            }
        };
    },
}

export default resolvers;
