import { ConsoleEvent } from './ConsoleEvent.js';
import { TestExecution } from './TestExecution.js';

export const createDataSources = () => ({
    consoleEvent: new ConsoleEvent(),
    testExecution: new TestExecution(),
});

export type DataSources = ReturnType<typeof createDataSources>;
