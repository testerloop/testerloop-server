import { IncomingHttpHeaders } from 'http';

import { Organisation, User } from '@prisma/client';

import { DataSources, createDataSources } from './datasources/index.js';
import authenticateUserService from './AuthenticateUserService.js';
import config from './config.js';
import repository from './repository/index.js';

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
    if (!apiKey) throw new Error('API key is required');

    const organisation =
        await repository.organisation.getOrganisationFromApiKey(apiKey);

    if (!organisation) throw new Error('Organisation not found');

    console.log('Valid API key found for: ', organisation.name);

    return { organisation };
};

export const createContext = async ({
    req,
}: {
    req: Request;
}): Promise<Context> => {
    let dataSources: DataSources | null = null;
    let user: User | null = null;
    const apiKey = req.headers['x-api-key']
        ? (req.headers['x-api-key'] as string)
        : null;
    const auth = await getAuth(apiKey);

    if (req.headers.authorization) {
        const token = req.headers.authorization.replace('Bearer ', '');
        if (!token) throw new Error('Invalid token');
        user = await authenticateUserService.getUser(token);
        console.log('Valid user');
    }

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
        user,
        config,
        repository,
    };

    dataSources = createDataSources(context);

    return context;
};
