import { TestExecutionCreationResponseResolvers } from './types/generated';

const resolvers: TestExecutionCreationResponseResolvers = {
    testExecutionId: ({ testExecutionId }) => testExecutionId,
    testExecutionGroupId: ({ testExecutionGroupId }) => testExecutionGroupId,
};

export default resolvers;
