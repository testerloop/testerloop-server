import { TestRunStatusResolvers } from './types/generated.js';

const resolvers: TestRunStatusResolvers = {
    runStatus: ({ runStatus }) => runStatus,
    totalWorkers: ({ totalWorkers }) => totalWorkers,
    totalActiveWorkers: ({ totalActiveWorkers }) => totalActiveWorkers,
    totalPendingWorkers: ({ totalPendingWorkers }) => totalPendingWorkers,
    totalCompletedWorkers: ({ totalCompletedWorkers }) => totalCompletedWorkers,
    testExecutionStatuses: ({ testExecutionStatuses }) => testExecutionStatuses,
};

export default resolvers;
