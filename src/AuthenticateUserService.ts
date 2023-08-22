import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { User } from '@prisma/client';

import repository from './repository/index.js';
import config from './config.js';
import { UnauthorisedError } from './errors.js';

const verifier = CognitoJwtVerifier.create({
    userPoolId: config.COGNITO_USER_POOL_ID,
    tokenUser: 'id',
    clientId: config.COGNITO_POOL_WEB_CLIENT_ID,
});

type Json = null | string | number | boolean | Json[] | JsonObject;
type JsonObject = { [name: string]: Json };

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

    public async getUser(token: string): Promise<User | null> {
        const payload = await this.decodeToken(token);
        const { email } = payload;

        const user = await repository.user.getUserByEmail(email as string);

        if (!user) {
            throw new UnauthorisedError();
        }

        return user;
    }
}

export default new AuthenticateUserService();
