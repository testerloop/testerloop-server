import { HttpHeadersResolvers } from './types/generated.js';

const resolvers: HttpHeadersResolvers = {
    size: ({ size }) => size,
    values: ({ values }) => values,
};

export default resolvers;
