import { IncomingHttpHeaders } from 'http';

import { Organisation, User } from '@prisma/client';

import { DataSources, createDataSources } from './datasources/index.js';
import authenticateUserService from './AuthenticateUserService.js';
import config from './config.js';
import repository from './repository/index.js';

interface GraphQLRequestBody {
    query: string;
    variables: {
        [key: string]: string;
    };
    operationName: string;
}

interface Request {
    headers: IncomingHttpHeaders;
    body?: GraphQLRequestBody | null;
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
    user?: User | null;
    config: typeof config;
    repository: typeof repository;
};

const getAuth = async (apiKey: string | null): Promise<Auth> => {
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

    const { headers, body } = req;
    const apiKey = headers['x-api-key'] as string | null;
    console.log(body?.operationName);
    const isCreateUserOperation = body?.operationName === 'CreateUser';

    if (headers.authorization) {
        const token = headers.authorization.replace('Bearer ', '');

        try {
            user = await authenticateUserService.getUser(token);
        } catch (error) {
            if (!isCreateUserOperation) {
                throw error;
            }
        }
    }

    const auth = apiKey ? await getAuth(apiKey) : undefined;

    if (!user && !auth && !isCreateUserOperation) {
        throw new Error('Invalid authentication credentials');
    }

    const context: Context = {
        get dataSources() {
            if (dataSources === null) {
                throw new Error(
                    'DataSources are not available during DataSource initialization.',
                );
            }
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
