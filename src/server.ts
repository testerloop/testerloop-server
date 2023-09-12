import http from 'http';

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { Request } from 'express';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import schema from './schema.js';
import resolvers from './resolvers/index.js';
import { createContext, Context } from './context.js';

export function createApolloServer(httpServer: http.Server) {
    const executableSchema = makeExecutableSchema({
        typeDefs: schema,
        resolvers,
    });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });

    const wsCleanup = useServer({ schema: executableSchema }, wsServer);

    const apolloConfig = {
        schema: executableSchema,
        context: async ({ req }: { req: Request }): Promise<Context> => {
            return createContext({ req });
        },
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
    };

    return new ApolloServer(apolloConfig);
}
