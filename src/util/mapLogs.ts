import { ConsoleEvent, ConsoleLogLevel } from "../resolvers/types/generated.js";

const TIMESTAMP_START_IDX = 1;
const TIMESTAMP_LENGTH = 13;
const LEVEL_START_IDX = TIMESTAMP_LENGTH + 2 + ' console.'.length;

const mapLogs = (logs: string[], testExecutionId: string) => {
    const mappedLogs: Record<string, {
        __typename: 'ConsoleLogEvent',
        id: string,
        at: Date,
        message: string,
        logLevel: ConsoleLogLevel,
        testExecutionId: string,
        stacktrace: Record<string,any>[]
    }> = {};

    for (let i = 0; i < logs.length - 1; i += 3) {
        const timeStamp = logs[i].substring(TIMESTAMP_START_IDX, TIMESTAMP_LENGTH + 1);
        const level = logs[i].substring(LEVEL_START_IDX).split(' ')[0];
        const message = logs[i + 1].trim().substring('Arguments: '.length);
        const stacktrace = JSON.parse(logs[i + 2].trim().substring('Stacktrace: '.length));

        let mappedLevel;
        switch(level){
            case 'error':
                mappedLevel = ConsoleLogLevel.Error;
                break;
            case 'warning':
                mappedLevel = ConsoleLogLevel.Warn;
                break;
            case 'log':
                mappedLevel = ConsoleLogLevel.Log;
                break;
            case 'info':
                mappedLevel = ConsoleLogLevel.Info;
                break;
        }
        const id = `${testExecutionId}/${i / 3 + 1}`;
    
        mappedLogs[id] = { 
            __typename: 'ConsoleLogEvent' as 'ConsoleLogEvent',
            id,
            logLevel: mappedLevel as ConsoleLogLevel,
            at: new Date(parseInt(timeStamp)),
            message,
            stacktrace,
            testExecutionId
        }
    }

    return mappedLogs;
}

export default mapLogs;
