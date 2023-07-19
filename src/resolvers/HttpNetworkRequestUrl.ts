import { HttpNetworkRequestUrlResolvers } from './types/generated.js';

const resolvers: HttpNetworkRequestUrlResolvers = {
    nonKeyValueQueryString: ({ nonKeyValueQueryString }) =>
        nonKeyValueQueryString,
    url: ({ url }) => url,
};

export default resolvers;
