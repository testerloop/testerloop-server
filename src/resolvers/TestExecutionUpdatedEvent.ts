import { TestExecutionUpdatedEventResolvers } from './types/generated';

const resolvers: TestExecutionUpdatedEventResolvers = {
    testExecution: (parent) => parent.testExecution,
};

export default resolvers;
