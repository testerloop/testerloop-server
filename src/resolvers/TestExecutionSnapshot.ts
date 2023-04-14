import { TestExecutionSnapshotResolvers } from './types/generated.js';

const resolvers: TestExecutionSnapshotResolvers = {
    at: ({ at }) => at,
    dom: ({ dom }) => dom,
    async testExecution({ id }) {
        const [runId, _] = id.split('/');
        return {
            __typename: 'TestExecution',
            id,
            testRun: {
                __typename: 'TestRun',
                id: runId
            }
        };
    },
};

export default resolvers;
