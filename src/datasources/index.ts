import { Context } from '../context.js';
import { ConsoleEvent } from './ConsoleEvent.js';
import { NetworkEvent } from './NetworkEvent.js';
import { TestExecution } from './TestExecution.js';
import { TestResults } from './TestResults.js';
import { TestCodeRevision } from './TestCodeRevision.js';
import { StepEvent } from './StepEvent.js';
import { CommandEvent } from './CommandEvent.js';
import { Snapshot } from './Snapshot.js';
import { ScenarioEvent } from './ScenarioEvent.js';
import { Screenshot } from './Screenshot.js';
import { TestRun } from './TestRun.js';

export const createDataSources = (context: Context) => ({
    consoleEvent: new ConsoleEvent(context),
    networkEvent: new NetworkEvent(context),
    testExecution: new TestExecution(context),
    testResults: new TestResults(context),
    testRun: new TestRun(context),
    testCodeRevision: new TestCodeRevision(context),
    stepEvent: new StepEvent(context),
    commandEvent: new CommandEvent(context),
    snapshot: new Snapshot(context),
    scenarioEvent: new ScenarioEvent(context),
    screenshot: new Screenshot(context)
});

export type DataSources = ReturnType<typeof createDataSources>;
