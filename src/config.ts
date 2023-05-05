import { AwsCredentialIdentity } from '@aws-sdk/types';
import { z } from 'zod';

export const envFormat = z.object({
    PORT: z.coerce.number(),
    AWS_SESSION_TOKEN: z.string().optional(),
    AWS_BUCKET_REGION: z.string(),
    AWS_ACCESS_KEY_ID: z.string().optional(),
    AWS_SECRET_ACCESS_KEY: z.string().optional(),
    AWS_BUCKET_NAME: z.string(),
    EXPIRES_IN: z.coerce.number()
});

const config = envFormat.parse(process.env);

let awsCredentials: AwsCredentialIdentity | undefined = undefined;

if (config.AWS_ACCESS_KEY_ID && config.AWS_SECRET_ACCESS_KEY) {
    awsCredentials = {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        sessionToken: config.AWS_SESSION_TOKEN,
    };
}

export default {
    PORT: config.PORT,
    AWS_BUCKET_REGION: config.AWS_BUCKET_REGION,
    AWS_BUCKET_NAME: config.AWS_BUCKET_NAME,
    EXPIRES_IN: config.EXPIRES_IN,
    AWS_CREDENTIALS: awsCredentials,
};
