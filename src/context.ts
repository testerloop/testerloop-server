import { IncomingHttpHeaders } from 'http';

import { User } from '@prisma/client';

import { DataSources, createDataSources } from './datasources/index.js';
import config from './config.js';
import repository from './repository/index.js';
import authenticateUserService, { Auth } from './AuthenticateUserService.js';

interface GraphQLRequestBody {
    query: string;
    variables: { [key: string]: string };
    operationName: string;
    extensions: {
        persistedQuery: {
            version: number;
            sha256Hash: string;
        };
    };
}

export interface Request {
    headers: IncomingHttpHeaders;
    body?: GraphQLRequestBody | null;
}

export type Context = {
    dataSources: DataSources;
    request: { req: Request };
    auth?: Auth;
    user?: User | null;
    config: typeof config;
    repository: typeof repository;
};

export const createContext = async ({
    req,
    wsAuthHeader,
}: {
    req: Request;
    wsAuthHeader?: string;
}): Promise<Context> => {
    const { auth, isRegisterClientOperation } =
        await authenticateUserService.handleAuthentication(req, wsAuthHeader);

    if (!auth && !isRegisterClientOperation) {
        throw new Error('Invalid authentication credentials');
    }

    const context: Context = {
        get dataSources() {
            return dataSources;
        },
        request: { req },
        auth,
        config,
        repository,
    };

    const dataSources: DataSources = isRegisterClientOperation
        ? ({} as DataSources)
        : createDataSources(context);

    return context;
};
