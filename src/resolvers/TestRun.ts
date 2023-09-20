import getPaginatedData from '../util/getPaginatedData.js';
import { encodeId } from '../util/id.js';

import { RunStatus, TestRunResolvers } from './types/generated.js';

const resolvers: TestRunResolvers = {
    id({ id }) {
        return encodeId('TestRun', id);
    },

    async testCodeRevision({ id }, _args, { dataSources }) {
        const testCodeRevisionData =
            await dataSources.testCodeRevision.getById(id);
        return testCodeRevisionData || null;
    },

    async status({ id }, _args, { repository }) {
        const testRun = await repository.testRun.getTestRun(id);
        return testRun.status as RunStatus;
    },

    async executions({ id }, { first, after }, { repository }) {
        const testExecutions =
            await repository.testExecution.getTestExecutionsbyRunId(id);

        const { edges, hasNextPage, hasPreviousPage, totalCount } =
            getPaginatedData(testExecutions, { first, after });

        return {
            edges: edges.map(({ cursor, node }) => ({
                cursor,
                node: {
                    __typename: 'TestExecution',
                    id: `${id}/${node.id}`,
                    testRun: {
                        __typename: 'TestRun',
                        id,
                    },
                },
            })),
            totalCount,
            hasNextPage,
            hasPreviousPage,
        };
    },
};

export default resolvers;
