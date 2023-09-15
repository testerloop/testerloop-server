import { TestExecutionCreatedEventResolvers } from './types/generated.js';

const resolvers: TestExecutionCreatedEventResolvers = {
    at: ({ at }) => at,
    testExecution: ({ testExecution }) => testExecution,
};

export default resolvers;
