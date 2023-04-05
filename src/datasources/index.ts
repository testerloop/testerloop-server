import { ConsoleEvent } from './ConsoleEvent.js';
import { NetworkEvent } from './NetworkEvent.js';
import { TestExecution } from './TestExecution.js';
import { TestResults } from './TestResults.js';
import { TestCodeRevision } from './TestCodeRevision.js';

export const createDataSources = () => ({
    consoleEvent: new ConsoleEvent(),
    networkEvent: new NetworkEvent(),
    testExecution: new TestExecution(),
    testResults: new TestResults(),
    testCodeRevision: new TestCodeRevision()
});

export type DataSources = ReturnType<typeof createDataSources>;
