import { TestRunStatusResolvers } from './types/generated.js';

const resolvers: TestRunStatusResolvers = {
    runStatus: ({ runStatus }) => runStatus,
    totalWorkers: ({ totalWorkers }) => totalWorkers,
    activeWorkers: ({ activeWorkers }) => activeWorkers,
    pendingWorkers: ({ pendingWorkers }) => pendingWorkers,
    completedWorkers: ({ completedWorkers }) => completedWorkers,
    testExecutionStatuses: ({ testExecutionStatuses }) => testExecutionStatuses,
};

export default resolvers;
