import { PageInfoResolvers } from './types/generated.js';

const resolvers: PageInfoResolvers = {
    hasNextPage: ({ hasNextPage }) => hasNextPage,
    hasPreviousPage: ({ hasPreviousPage }) => hasPreviousPage,
    startCursor: ({ startCursor }) => startCursor,
    endCursor: ({ endCursor }) => endCursor,
};

export default resolvers;
