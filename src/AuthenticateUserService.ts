import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { CognitoIdTokenPayload } from 'aws-jwt-verify/jwt-model.js';
import { Organisation, User } from '@prisma/client';

import repository from './repository/index.js';
import config from './config.js';
import { UnauthorisedError } from './errors.js';
import { Request } from './context.js';

const verifier = CognitoJwtVerifier.create({
    userPoolId: config.COGNITO_USER_POOL_ID,
    tokenUser: 'id',
    clientId: config.COGNITO_POOL_WEB_CLIENT_ID,
});

type Json = null | string | number | boolean | Json[] | JsonObject;
type JsonObject = { [name: string]: Json };

export type Auth = APIKeyAuth | JWTAuth;
type APIKeyAuth = { organisation: Organisation };
type JWTAuth = { organisation: Organisation; user: UserWithPayload };
type AuthenticationResult = { auth?: Auth; isRegisterClientOperation: boolean };
type UserWithPayload = CognitoIdTokenPayload & { user: User };

class AuthenticateUserService {
    private async decodeToken(token: string): Promise<JsonObject> {
        try {
            const payload = await verifier.verify(token, {
                tokenUse: 'id',
                clientId: config.COGNITO_POOL_WEB_CLIENT_ID,
            });
            return payload;
        } catch (err) {
            console.error('Token is invalid', err);
            throw new Error('Invalid token');
        }
    }

    public async getUser(token: string): Promise<UserWithPayload | null> {
        const payload = (await this.decodeToken(
            token,
        )) as CognitoIdTokenPayload;
        const { email } = payload;

        const user = await repository.user.getUserByEmail(email as string);

        if (!user) {
            throw new UnauthorisedError();
        }

        return { ...payload, user };
    }

    handleAuthentication = async (
        req: Request,
    ): Promise<AuthenticationResult> => {
        const { body, headers } = req;

        const QUERY_HASHES = {
            registerClient:
                'c68c719aad23759e7258f7d1a653a3a7dcd3bc0ae399aebb1b06d2c80d546757',
        };

        const isRegisterClientOperationByQuery = /registerClient/gm.test(
            body?.query ?? '',
        );
        const isRegisterClientOperationByHash =
            body?.extensions?.persistedQuery?.sha256Hash ===
            QUERY_HASHES.registerClient;

        const isRegisterClientOperation =
            isRegisterClientOperationByQuery || isRegisterClientOperationByHash;

        const authorizationHeader = req.headers.authorization;
        const apiKey = headers['x-api-key'] as string | null;

        if (isRegisterClientOperation) {
            return { auth: undefined, isRegisterClientOperation };
        }

        if (authorizationHeader) {
            const token = authorizationHeader.replace('Bearer ', '');

            try {
                const user = await this.getUser(token);
                if (user === null) throw new Error('User not found');
                const organisation =
                    await repository.organisation.getOrganisationWithValidApiKeyForUser(
                        user.user.id,
                    );
                if (!organisation) throw new Error('Organisation not found');
                return {
                    auth: { organisation, user },
                    isRegisterClientOperation,
                };
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
}

export default new AuthenticateUserService();
