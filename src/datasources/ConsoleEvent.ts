import { ConsoleLogLevel } from '../resolvers/types/generated.js';
import S3Service from '../S3Service.js';
import mapLogs from '../util/mapLogs.js';

export const data: {
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
        at: new Date(1678885289807),
        message: 'Arguments: SENTRY WAS __NOT__ INITIALIZED. Logs will be forwarded to console instead.',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '2': {
        __typename: 'ConsoleLogEvent',
        id: '2',
        at: new Date(1678885289807),
        message: 'Arguments: SENTRY WAS __NOT__ INITIALIZED. Logs will be forwarded to console instead.',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '3': {
        __typename: 'ConsoleLogEvent',
        id: '3',
        at: new Date(1678885289899),
        message: 'Arguments: yui: NOT loaded: squarespace-cldr_resource_pack',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '4': {
        __typename: 'ConsoleLogEvent',
        id: '4',
        at: new Date(1678885289900),
        message: 'Arguments: yui: NOT loaded: squarespace-common_vendors_stable',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '5': {
        __typename: 'ConsoleLogEvent',
        id: '5',
        at: new Date(1678885289900),
        message: 'Arguments: yui: NOT loaded: squarespace-common_vendors',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '6': {
        __typename: 'ConsoleLogEvent',
        id: '6',
        at: new Date(1678885289902),
        message: 'Arguments: yui: NOT loaded: squarespace-performance',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '7': {
        __typename: 'ConsoleLogEvent',
        id: '7',
        at: new Date(1678885289899),
        message: 'Arguments: yui: NOT loaded: squarespace-cldr_resource_pack',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '8': {
        __typename: 'ConsoleLogEvent',
        id: '8',
        at: new Date(1678885289900),
        message: 'Arguments: yui: NOT loaded: squarespace-common_vendors_stable',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '9': {
        __typename: 'ConsoleLogEvent',
        id: '9',
        at: new Date(1678885289900),
        message: 'Arguments: yui: NOT loaded: squarespace-common_vendors',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '10': {
        __typename: 'ConsoleLogEvent',
        id: '10',
        at: new Date(1678885289902),
        message: 'Arguments: yui: NOT loaded: squarespace-performance',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '11': {
        __typename: 'ConsoleLogEvent',
        id: '11',
        at: new Date(1678885291476),
        message: 'Arguments: SENTRY WAS __NOT__ INITIALIZED. Logs will be forwarded to console instead.',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '12': {
        __typename: 'ConsoleLogEvent',
        id: '12',
        at: new Date(1678885291476),
        message: 'Arguments: SENTRY WAS __NOT__ INITIALIZED. Logs will be forwarded to console instead.',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '13': {
        __typename: 'ConsoleLogEvent',
        id: '13',
        at: new Date(1678885291535),
        message: 'Arguments: yui: NOT loaded: squarespace-cldr_resource_pack',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '14': {
        __typename: 'ConsoleLogEvent',
        id: '14',
        at: new Date(1678885291535),
        message: 'Arguments: yui: NOT loaded: squarespace-cldr_resource_pack',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '15': {
        __typename: 'ConsoleLogEvent',
        id: '15',
        at: new Date(1678885291535),
        message: 'Arguments: yui: NOT loaded: squarespace-common_vendors_stable',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '16': {
        __typename: 'ConsoleLogEvent',
        id: '16',
        at: new Date(1678885291537),
        message: 'Arguments: yui: NOT loaded: squarespace-common_vendors',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '17': {
        __typename: 'ConsoleLogEvent',
        id: '17',
        at: new Date(1678885291535),
        message: 'Arguments: yui: NOT loaded: squarespace-common_vendors_stable',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '18': {
        __typename: 'ConsoleLogEvent',
        id: '18',
        at: new Date(1678885291535),
        message: 'Arguments: yui: NOT loaded: squarespace-common_vendors',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '19': {
        __typename: 'ConsoleLogEvent',
        id: '19',
        at: new Date(1678885291535),
        message: 'Arguments: yui: NOT loaded: squarespace-performance',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
    '20': {
        __typename: 'ConsoleLogEvent',
        id: '20',
        at: new Date(1678885291537),
        message: 'Arguments: yui: NOT loaded: squarespace-performance',
        logLevel: ConsoleLogLevel.Warn,
        testExecutionId: '1234',
    },
}

export const getLogs = async () => {
    const bucketName = 'otf-lambda-results';
    const runId = 'd7a674e5-9726-4c62-924b-0bb846e9f213';
    const requestId = '00343af4-acf3-473b-9975-0c2bd26e47o1';

    const logs = await S3Service.getObject(bucketName, `${runId}/${requestId}/console/console-logs.txt`)
    
    const mappedLogs = mapLogs(logs);

    return mappedLogs;
}
export class ConsoleEvent {
    async getById(id: string) {
        const logs = await getLogs();
        return logs.find((log) => log.id === id) ?? null;
    }
}
