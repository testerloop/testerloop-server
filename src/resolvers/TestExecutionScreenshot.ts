import { TestExecutionScreenshotResolvers } from './types/generated.js';

const resolvers: TestExecutionScreenshotResolvers = {
    at: ({ at }) => at,
    url: ({ url }) => url,
    async testExecution({ testExecutionId }) {
        const [runId, _] = testExecutionId.split('/');
        return {
            __typename: 'TestExecution',
            id: testExecutionId,
            testRun: {
                __typename: 'TestRun',
                id: runId
            }
        };
    },
};

export default resolvers;
