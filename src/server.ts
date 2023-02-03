import { ApolloServer } from '@apollo/server';
import schema from './schema.js';
import resolvers from './resolvers/index.js';
import { Context } from './context.js';

const server = new ApolloServer<Context>({
    typeDefs: schema,
    resolvers,
});

export default server;
