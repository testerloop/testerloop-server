import { TestRunStatusResolvers } from './types/generated.js';

const resolvers: TestRunStatusResolvers = {
    status: ({ status }) => status,
    testExecutions: ({ testExecutions }) => testExecutions,
};

export default resolvers;
