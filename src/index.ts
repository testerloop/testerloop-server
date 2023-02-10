import {
    startServerAndCreateLambdaHandler,
    handlers,
} from '@as-integrations/aws-lambda';
import { createContext } from './context.js';
import server from './server.js';

export const graphqlHandler = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventRequestHandler(),
    {
        context: createContext,
    },
);
