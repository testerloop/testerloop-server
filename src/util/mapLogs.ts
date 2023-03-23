import { ConsoleLogLevel } from "../resolvers/types/generated.js";

const TIMESTAMP_START_IDX = 1;
const TIMESTAMP_LENGTH = 13;
const LEVEL_START_IDX = TIMESTAMP_LENGTH + 2 + ' console.'.length;

const mapLogs = (logs: string[]) => {
    const mappedLogs = [];

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
    
        mappedLogs.push({ 
            __typename: 'ConsoleLogEvent' as 'ConsoleLogEvent',
            id: `${i / 3 + 1}`,
            logLevel: mappedLevel as ConsoleLogLevel,
            at: new Date(parseInt(timeStamp)),
            message,
            stacktrace,
            testExecutionId: '1234'
        })
    }

    return mappedLogs;
}

export default mapLogs;
