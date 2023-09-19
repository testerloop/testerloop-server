import http from 'http';

import express, { Request } from 'express';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';

import config from './config.js';
import { createApolloServer } from './server.js';
import { Context, createContext } from './context.js';

async function startExpressServer() {
    try {
        const app = express();
        const httpServer = http.createServer(app);

        const server = createApolloServer(httpServer);
        const context = {
            context: async ({ req }: { req: Request }): Promise<Context> => {
                return createContext({ req });
            },
        };
        await server.start();

        app.use(bodyParser.json());
        app.use('/', expressMiddleware(server, context));

        await new Promise<void>((resolve) =>
            httpServer.listen({ port: config.PORT }, () => {
                console.log(
                    `Server started at http://localhost:${config.PORT}/`,
                );
                resolve();
            }),
        );
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

startExpressServer();
