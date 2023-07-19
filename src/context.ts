import { IncomingHttpHeaders } from 'http';

import { Organisation } from '@prisma/client';

import { DataSources, createDataSources } from './datasources/index.js';
import config from './config.js';
import repository from './repository/repository.js';

interface Request {
    headers: IncomingHttpHeaders;
}

export interface Auth {
    organisation: Organisation;
}

export type Context = {
    dataSources: DataSources;
    request: {
        req: Request;
    };
    auth?: Auth;
    config: typeof config;
    repository: typeof repository;
};

const getAuth = async (apiKey: string | null): Promise<Auth | undefined> => {
    if (config.DB_ENABLED && !apiKey) throw new Error('API key is required');

    if (!apiKey || !config.DB_ENABLED) return;

    const organisation = await repository.getByApiKey(apiKey);

    if (!organisation) throw new Error('Invalid API key provided');

    console.log('Valid API key found for: ', organisation.name);

    return {
        organisation: organisation,
    };
};

export const createContext = async ({
    req,
}: {
    req: Request;
}): Promise<Context> => {
    let dataSources: DataSources | null = null;
    const apiKey = req.headers['x-api-key']
        ? (req.headers['x-api-key'] as string)
        : null;
    console.log(apiKey);
    const auth = await getAuth(apiKey);

    const context = {
        get dataSources() {
            if (dataSources === null)
                throw new Error(
                    'DataSources are not available during DataSource initialization.',
                );
            return dataSources;
        },
        request: { req },
        auth,
        config,
        repository,
    };

    dataSources = createDataSources(context);

    return context;
};
