import { ConsoleLogLevel } from '../resolvers/types/generated.js';

const data: {
    [id: string]: {
        __typename: 'ConsoleLogEvent',
        id: string,
        at: Date,
        message: string,
        logLevel: ConsoleLogLevel,
        testExecutionId: string,
    }
} = {
    '1': {
        __typename: 'ConsoleLogEvent',
        id: '1',
        at: new Date(1676288339022),
        message: 'Arguments: yui: NOT loaded: squarespace-cldr_resource_pack',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '2': {
        __typename: 'ConsoleLogEvent',
        id: '2',
        at: new Date(1676288339025),
        message: 'Arguments: yui: NOT loaded: squarespace-common_vendors_stable',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '3': {
        __typename: 'ConsoleLogEvent',
        id: '3',
        at: new Date(1676288339026),
        message: 'Arguments: yui: NOT loaded: squarespace-common_vendors',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '4': {
        __typename: 'ConsoleLogEvent',
        id: '4',
        at: new Date(1676288339032),
        message: 'Arguments: yui: NOT loaded: squarespace-performance',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '5': {
        __typename: 'ConsoleLogEvent',
        id: '5',
        at: new Date(1676288339221),
        message: 'Arguments: SENTRY WAS __NOT__ INITIALIZED. Logs will be forwarded to console instead.',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '6': {
        __typename: 'ConsoleLogEvent',
        id: '6',
        at: new Date(1676288340834),
        message: 'Arguments: yui: NOT loaded: squarespace-cldr_resource_pack',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '7': {
        __typename: 'ConsoleLogEvent',
        id: '7',
        at: new Date(1676288340836),
        message: 'Arguments: yui: NOT loaded: squarespace-common_vendors_stable',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '8': {
        __typename: 'ConsoleLogEvent',
        id: '8',
        at: new Date(1676288340836),
        message: 'Arguments: yui: NOT loaded: squarespace-common_vendors',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '9': {
        __typename: 'ConsoleLogEvent',
        id: '9',
        at: new Date(1676288340838),
        message: 'Arguments: yui: NOT loaded: squarespace-performance',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '10': {
        __typename: 'ConsoleLogEvent',
        id: '10',
        at: new Date(1676288340862),
        message: 'Arguments: SENTRY WAS __NOT__ INITIALIZED. Logs will be forwarded to console instead.',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
}

export class ConsoleEvent {
    getById(id: string) {
        return data[id] ?? null;
    }
}
