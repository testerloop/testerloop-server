import { z } from 'zod';

const envFormat = z.object({
    PORT: z.coerce.number(),
});

const config = envFormat.parse(process.env);

export default config;
