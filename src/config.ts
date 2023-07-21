import { z } from 'zod';

export const envFormat = z.object({
    PORT: z.coerce.number(),
    DB_ENABLED: z.coerce.boolean(),
    AWS_SESSION_TOKEN: z.string().optional(),
    AWS_BUCKET_REGION: z.string(),
    AWS_ACCESS_KEY_ID: z.string().optional(),
    AWS_SECRET_ACCESS_KEY: z.string().optional(),
    AWS_BUCKET_NAME: z.string(),
    AWS_BUCKET_PATH: z.string().optional(),
    EXPIRES_IN: z.coerce.number(),
});

const config = envFormat.parse(process.env);

let awsCredentials;

if (config.AWS_ACCESS_KEY_ID && config.AWS_SECRET_ACCESS_KEY) {
    awsCredentials = {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        sessionToken: config.AWS_SESSION_TOKEN,
    };
}

if (config.AWS_BUCKET_PATH?.length && !config.AWS_BUCKET_PATH.endsWith('/')) {
    throw new Error(
        'Configuration error: AWS_BUCKET_PATH must end with "/" if specified',
    );
}

export default {
    PORT: config.PORT,
    DB_ENABLED: config.DB_ENABLED || false,
    AWS_BUCKET_REGION: config.AWS_BUCKET_REGION,
    AWS_BUCKET_NAME: config.AWS_BUCKET_NAME,
    AWS_BUCKET_PATH: config.AWS_BUCKET_PATH || '',
    EXPIRES_IN: config.EXPIRES_IN,
    AWS_CREDENTIALS: awsCredentials,
};
