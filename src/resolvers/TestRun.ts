import { encodeId } from '../util/id.js';

import { TestRunResolvers } from './types/generated.js';

const resolvers: TestRunResolvers = {
    id({ id }) {
        return encodeId('TestRun', id);
    },
    async testCodeRevision({ id }, _args, { dataSources }) {
        return dataSources.testCodeRevision.getById(id);
    },
    async executions({ id }, { first, after }, { dataSources }) {
        const { edges, hasNextPage, hasPreviousPage, totalCount } =
            await dataSources.testExecution.getByTestRunId(id, {
                first,
                after,
            });
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
