import { TestExecutionEventConnectionResolvers } from './types/generated.js';

const resolvers: TestExecutionEventConnectionResolvers = {
    edges: ({ edges }) => edges,
    totalCount: ({ totalCount }) => totalCount,
    pageInfo({ edges, hasNextPage, hasPreviousPage }) {
        const startCursor = edges[0]?.cursor ?? null;
        const endCursor = edges[edges.length - 1]?.cursor ?? null;
        return {
            __typename: 'PageInfo',
            hasNextPage,
            hasPreviousPage,
            startCursor,
            endCursor,
        };
    },
}

export default resolvers;
