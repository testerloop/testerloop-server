import { TestExecution } from './TestExecution.js';

export const createDataSources = () => ({
    testExecution: new TestExecution(),
});

export type DataSources = ReturnType<typeof createDataSources>;
