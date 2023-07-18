import { TestExecutionStatusResolvers } from './types/generated.js';

const resolvers: TestExecutionStatusResolvers = {
    runStatus: ({ runStatus }) => runStatus,
    testStatus: ({ testStatus }) => testStatus,
    name: ({ name }) => name,
    id: ({ id }) => id,
};

export default resolvers;
