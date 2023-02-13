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
        at: new Date(1675783366865),
        message: 'Arguments: yui: NOT loaded: squarespace-cldr_resource_pack',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '2': {
        __typename: 'ConsoleLogEvent',
        id: '2',
        at: new Date(1675783366868),
        message: 'Arguments: yui: NOT loaded: squarespace-common_vendors_stable',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '3': {
        __typename: 'ConsoleLogEvent',
        id: '3',
        at: new Date(1675783366869),
        message: 'Arguments: yui: NOT loaded: squarespace-common_vendors',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '4': {
        __typename: 'ConsoleLogEvent',
        id: '4',
        at: new Date(1675783366878),
        message: 'Arguments: yui: NOT loaded: squarespace-performance',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
}

export class ConsoleEvent {
    getById(id: string) {
        return data[id] ?? null;
    }
}
