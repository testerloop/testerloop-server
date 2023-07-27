import { CreateTestExecutionResponseResolvers } from './types/generated';

const resolvers: CreateTestExecutionResponseResolvers = {
    testExecutionId: ({ testExecutionId }) => testExecutionId,
    testExecutionGroupId: ({ testExecutionGroupId }) => testExecutionGroupId,
};

export default resolvers;
