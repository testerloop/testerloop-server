import { IncomingHttpHeaders } from 'http';
import { DataSources, createDataSources } from './datasources/index.js';
import { Organisation } from '@prisma/client';
import { prismaClient } from './db.js';
interface Request {
    headers: IncomingHttpHeaders;
}

interface Auth {
    organisation: Organisation;
}

export type Context = {
    dataSources: DataSources;
    request: {
        req: Request;
    };
    auth: Auth | null;
};

export const createContext = async ({
    req,
}: {
    req: Request;
}): Promise<Context> => {
    let dataSources: DataSources | null = null;
    let auth: Auth | null = null;
    if (req.headers['x-api-key']) {
        const apiKey = req.headers['x-api-key'] as string;
        const organisation = await prismaClient.getByApiKey(apiKey);
        if (!organisation) throw new Error('Invalid API key provided');
        console.log('Valid API key found for: ', organisation.name);
        auth = {
            organisation: organisation,
        };
    }

    const context = {
        get dataSources() {
            if (dataSources === null)
                throw new Error(
                    'DataSources are not available during DataSource initialization.'
                );
            return dataSources;
        },
        request: { req },
        auth,
    };

    dataSources = createDataSources(context);
    return context;
};
