import { Context } from '../context.js';
import { ConsoleEvent } from './ConsoleEvent.js';
import { NetworkEvent } from './NetworkEvent.js';
import { TestExecution } from './TestExecution.js';

export const createDataSources = (context: Context) => ({
    consoleEvent: new ConsoleEvent(context),
    networkEvent: new NetworkEvent(context),
    testExecution: new TestExecution(context),
});

export type DataSources = ReturnType<typeof createDataSources>;
