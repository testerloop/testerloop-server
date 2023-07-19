import { TestExecutionEnvironmentResolvers } from './types/generated.js';

const resolvers: TestExecutionEnvironmentResolvers = {
    browser: ({ browser }) => browser,
};

export default resolvers;
