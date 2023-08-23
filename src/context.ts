import { IncomingHttpHeaders } from 'http';

import { User, Organisation } from '@prisma/client';
import { CognitoIdTokenPayload } from '@xeedware/cognito-jwt';

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

export type Auth = APIKeyAuth | JWTAuth;

export type APIKeyAuth = {
    organisation: Organisation;
};

export type JWTAuth = {
    organisation: Organisation;
    user: UserWithPayload;
};

type AuthenticationResult = {
    auth?: Auth;
    isRegisterClientOperation: boolean;
};

export type UserWithPayload = CognitoIdTokenPayload & {
    user: User;
};

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

const authenticateRequest = async (
    req: Request,
): Promise<AuthenticationResult> => {
    const { body, headers } = req;

    const operationName = body?.operationName;
    const isRegisterClientOperation = operationName === 'RegisterClient';

    const authorizationHeader = req.headers.authorization;
    const apiKey = headers['x-api-key'] as string | null;

    if (authorizationHeader) {
        const token = authorizationHeader.replace('Bearer ', '');

        try {
            const user = await authenticateUserService.getUser(token);
            if (user === null) throw new Error('User not found');
            const organisation =
                await repository.organisation.getOrganisationWithValidApiKeyForUser(
                    user.user.id,
                );
            if (!organisation) throw new Error('Organisation not found');
            return { auth: { organisation, user }, isRegisterClientOperation };
        } catch (error) {
            throw new Error('Invalid JWT token');
        }
    }

    if (apiKey) {
        const organisation =
            await repository.organisation.getOrganisationFromApiKey(apiKey);
        if (!organisation) throw new Error('Organisation not found');
        console.log('Valid API key found for: ', organisation.name);
        return { auth: { organisation }, isRegisterClientOperation };
    }

    throw new Error('No authentication credentials provided');
};

export const createContext = async ({
    req,
}: {
    req: Request;
}): Promise<Context> => {
    let dataSources: DataSources | null = null;

    const { auth, isRegisterClientOperation } = await authenticateRequest(req);
    console.log('Auth: ', auth);
    if (!auth && !isRegisterClientOperation) {
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
        config,
        repository,
    };

    dataSources = createDataSources(context);

    return context;
};
