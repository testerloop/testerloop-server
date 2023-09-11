import { TestExecutionStatusUpdateResolvers } from './types/generated';

const resolvers: TestExecutionStatusUpdateResolvers = {
    id: ({ id }) => id,
    status: ({ status }) => status,
};

export default resolvers;
