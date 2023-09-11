import { ApolloServer } from '@apollo/server';
import { Request } from 'express';

import schema from './schema.js';
import resolvers from './resolvers/index.js';
import { createContext, Context } from './context.js';

const apolloConfig = {
    typeDefs: schema,
    resolvers,
    context: async ({ req }: { req: Request }): Promise<Context> => {
        return createContext({ req });
    },
};

const server = new ApolloServer(apolloConfig);
export default server;
