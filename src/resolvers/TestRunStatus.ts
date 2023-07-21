import { TestRunStatusResolvers } from './types/generated.js';

const resolvers: TestRunStatusResolvers = {
    runStatus: ({ runStatus }) => runStatus,
    testExecutionStatuses: ({ testExecutionStatuses }) => testExecutionStatuses,
};

export default resolvers;
