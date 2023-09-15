import http from 'http';

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import schema from './schema.js';
import resolvers from './resolvers/index.js';
import { createContext } from './context.js';

export function createApolloServer(httpServer: http.Server) {
    const executableSchema = makeExecutableSchema({
        typeDefs: schema,
        resolvers,
    });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/',
    });

    const wsCleanup = useServer(
        {
            schema: executableSchema,
            context(ctx) {
                const authHeader = ctx.connectionParams?.Authorization;
                return createContext({
                    req: ctx.extra.request,
                    wsAuthHeader:
                        typeof authHeader === 'string' ? authHeader : undefined,
                });
            },
        },
        wsServer,
    );

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
