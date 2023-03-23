import { ConsoleEvent } from './ConsoleEvent.js';
import { NetworkEvent } from './NetworkEvent.js';
import { TestExecution } from './TestExecution.js';

export const createDataSources = () => ({
    consoleEvent: new ConsoleEvent(),
    networkEvent: new NetworkEvent(),
    testExecution: new TestExecution(),
});

export type DataSources = ReturnType<typeof createDataSources>;
