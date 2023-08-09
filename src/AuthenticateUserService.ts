import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { PrismaClient, User } from '@prisma/client';

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
    prisma: PrismaClient = new PrismaClient();

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

    public async getUser(token: string): Promise<User> {
        const payload = await this.decodeToken(token);
        const { given_name, family_name, email } = payload;

        let user = await this.prisma.user.findUnique({
            where: { email: email as string },
        });

        if (!user) {
            throw new UnauthorisedError();
        }

        if (given_name && family_name && !user.firstName && !user.lastName) {
            user = await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    firstName: given_name as string,
                    lastName: family_name as string,
                },
            });
        }
        return user;
    }
}

export default new AuthenticateUserService();
