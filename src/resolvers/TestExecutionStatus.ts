import { TestExecutionStatusResolvers } from './types/generated.js';

const resolvers: TestExecutionStatusResolvers = {
    testStatus: ({ testStatus }) => testStatus,
    testName: ({ testName }) => testName,
    id: ({ id }) => id,
};

export default resolvers;
