import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import config from './config.js';
import schema from './schema.js';
import resolvers from './resolvers/index.js';
import { Context } from './context.js';

const server = new ApolloServer<Context>({
    typeDefs: schema,
    resolvers,
});

const { url } = await startStandaloneServer(
    server,
    {
        async context() {
            return {};
        },
        listen: {
            port: config.PORT,
        },
    },
);
console.log(`Server started at ${url}`);
