import { TestExecutionSnapshotResolvers } from './types/generated.js';

const resolvers: TestExecutionSnapshotResolvers = {
    at: ({ at }) => at,
    dom: ({ dom }) => dom,
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
