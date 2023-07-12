import { createDataSources, DataSources } from './datasources/index.js';
import { IncomingHttpHeaders } from 'http';

interface Request {
    headers: IncomingHttpHeaders;
}

export type Context = {
    dataSources: DataSources;
    request: {
        req: Request;
    };
};

export const createContext = async ({ req }: { req: Request }): Promise<Context> => {
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