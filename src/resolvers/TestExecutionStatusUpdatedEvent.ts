import { TestExecutionStatusUpdatedEventResolvers } from './types/generated.js';

const resolvers: TestExecutionStatusUpdatedEventResolvers = {
    testExecution: ({ testExecution }) => testExecution,
};

export default resolvers;
