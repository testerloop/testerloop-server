import { TestExecutionStatusResolvers } from './types/generated.js';

const resolvers: TestExecutionStatusResolvers = {
    runStatus: ({ runStatus }) => runStatus,
    testOutcome: ({ testOutcome }) => testOutcome,
    name: ({ name }) => name,
    id: ({ id }) => id,
};

export default resolvers;
