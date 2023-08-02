import { TestExecutionStatusResolvers } from './types/generated.js';

const resolvers: TestExecutionStatusResolvers = {
    testStatus: ({ testStatus }) => testStatus,
    testName: ({ testName }) => testName,
    featureFile: ({ featureFile }) => featureFile,
    rerunOfId: ({ rerunOfId }) => rerunOfId,
    id: ({ id }) => id,
};

export default resolvers;
