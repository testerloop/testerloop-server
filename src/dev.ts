import http from 'http';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';

import config from './config.js';
import server from './server.js';

async function startExpressServer() {
    try {
        const app = express();
        const httpServer = http.createServer(app);

        await server.start();

        app.use(cors());
        app.use(bodyParser.json());

        app.use('/graphql', expressMiddleware(server));

        await new Promise<void>((resolve) =>
            httpServer.listen({ port: config.PORT }, () => {
                console.log(
                    `Server started at http://localhost:${config.PORT}/graphql`,
                );
                resolve();
            }),
        );
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

startExpressServer();
