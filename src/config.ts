import { z } from 'zod';

const envFormat = z.object({
    PORT: z.coerce.number(),
    AWS_REGION: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
});

const config = envFormat.parse(process.env);

export default config;
