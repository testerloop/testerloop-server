import { assertNonNull } from '../util/assertNonNull.js';
import { encodeId } from '../util/id.js';

import {
    ConsoleLogEventResolvers,
    ConsoleLogLevel,
} from './types/generated.js';
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
        if (event.args.length < 1)
            return 'Console event does not have any arguments.';

        const messages = event.args.map((arg) => {
            switch (arg.type) {
                case 'undefined':
                    return 'undefined';
                case 'string':
                case 'boolean':
                    return String(arg.value);
                case 'object':
                    return JSON.stringify(arg);
                default:
                    return 'Unsupported argument type in console event.';
            }
        });

        return messages.join(' ');
    },

    async stackTrace({ id }, _args) {
        return {
            __typename: 'StackTrace',
            id: id,
        };
    },
    async testExecution({ id }, _args) {
        const [runId, testId] = id.split('/');
        return {
            __typename: 'TestExecution',
            id: testId,
            testRun: {
                __typename: 'TestRun',
                id: runId,
            },
        };
    },
};

export default resolvers;
