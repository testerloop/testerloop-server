import z from 'zod';

const baseLog = z.object({
    args: z.array(z.discriminatedUnion('type', [
        z.object({
            type: z.literal('string'),
            value: z.string(),
        }),
    ])),
    id: z.string(),
    timestamp: z.coerce.date(),
});

const logSchema = z.discriminatedUnion('type', [
    z.object({
        type: z.literal('warning'),
    }).merge(baseLog),
    z.object({
        type: z.literal('log'),
    }).merge(baseLog),
    z.object({
        type: z.literal('info'),
    }).merge(baseLog),
    z.object({
        type: z.literal('error'),
    }).merge(baseLog),
    z.object({
        type: z.literal('debug'),
    }).merge(baseLog),
]);

export type Log = z.infer<typeof logSchema>;

const fileSchema = z.array(logSchema);
export type LogFile = z.infer<typeof fileSchema>;

export const parseLogFile = (file: unknown) => fileSchema.parse(file);
