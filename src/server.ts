import http from 'http';

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import schema from './schema.js';
import resolvers from './resolvers/index.js';

export function createApolloServer(httpServer: http.Server) {
    const executableSchema = makeExecutableSchema({
        typeDefs: schema,
        resolvers,
    });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/',
    });

    const wsCleanup = useServer({ schema: executableSchema }, wsServer);

    return new ApolloServer({
        schema: executableSchema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await wsCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });
}
