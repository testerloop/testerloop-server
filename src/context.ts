import { createDataSources, DataSources } from './datasources/index.js';
import { IncomingHttpHeaders } from 'http';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { LambdaContextFunctionArgument } from '@as-integrations/aws-lambda';
import { RequestHandler } from '@as-integrations/aws-lambda/dist/request-handlers/_create.js';
interface Request {
    headers: IncomingHttpHeaders;
}

export type Context = {
    dataSources: DataSources;
    request: {
        req: Request;
    };
};

export const createContext = async ({
    event,
}: LambdaContextFunctionArgument<
    RequestHandler<APIGatewayProxyEvent, APIGatewayProxyResult>
>): Promise<Context> => {
    const req = event;
    let dataSources: DataSources | null = null;
    const context = {
        get dataSources() {
            if (dataSources === null)
                throw new Error(
                    'DataSources are not available during DataSource initialization.'
                );
            return dataSources;
        },
        request: { req },
    };
    dataSources = createDataSources(context);
    return context;
};

export const createStandaloneContext = async ({
    req,
}: {
    req: Request;
}): Promise<Context> => {
    let dataSources: DataSources | null = null;
    const context = {
        get dataSources() {
            if (dataSources === null)
                throw new Error(
                    'DataSources are not available during DataSource initialization.'
                );
            return dataSources;
        },
        request: { req },
    };
    dataSources = createDataSources(context);
    return context;
};