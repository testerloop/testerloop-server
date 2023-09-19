import { TestExecutionStatusUpdatedEventResolvers } from './types/generated.js';

const resolvers: TestExecutionStatusUpdatedEventResolvers = {
    at: ({ at }) => at,
    testExecution: ({ testExecution }) => testExecution,
};

export default resolvers;
