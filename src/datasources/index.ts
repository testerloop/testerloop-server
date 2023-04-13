import { Context } from '../context.js';
import { ConsoleEvent } from './ConsoleEvent.js';
import { NetworkEvent } from './NetworkEvent.js';
import { TestExecution } from './TestExecution.js';
import { TestResults } from './TestResults.js';
import { TestCodeRevision } from './TestCodeRevision.js';
import { StepEvent } from './StepEvent.js';

export const createDataSources = (context: Context) => ({
    consoleEvent: new ConsoleEvent(context),
    networkEvent: new NetworkEvent(context),
    testExecution: new TestExecution(context),
    testResults: new TestResults(context),
    testCodeRevision: new TestCodeRevision(context),
    stepEvent: new StepEvent(context),
});

export type DataSources = ReturnType<typeof createDataSources>;
