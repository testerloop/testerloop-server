import { CognitoJwtVerifier } from 'aws-jwt-verify';
import config from './config.js';
import { PrismaClient, User } from '@prisma/client';

const verifier = CognitoJwtVerifier.create({
    userPoolId: config.COGNITO_USER_POOL_ID,
    tokenUser: 'id',
    clientId: config.COGNITO_POOL_WEB_CLIENT_ID,
});

type Json = null | string | number | boolean | Json[] | JsonObject;
type JsonObject = { [name: string]: Json };


class AuthenticateUserService {

    prisma: PrismaClient = new PrismaClient();

    private async decodeToken(token: string): Promise<JsonObject | null> {
        try {
            const payload = await verifier.verify(
                token, 
                {tokenUse: 'id', clientId: config.COGNITO_POOL_WEB_CLIENT_ID}
            );
            return payload;
        } catch(err) {
            console.error('Token is invalid', err);
        }
        return null;
    }

    public async getUser(token: string): Promise<User | null> {
        const payload = await this.decodeToken(token);

        if (payload !== null) {
            return this.prisma.user.findUnique({
                where: { email: payload.email as string }
            });
        }
        return null;
    }
}

export default new AuthenticateUserService();
