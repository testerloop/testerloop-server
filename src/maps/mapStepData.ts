import { z } from 'zod';

const ErrorSchema = z.object({
    message: z.string(),
    name: z.string(),
    stack: z.string() 
})

const OptionsSchema = z.object({
    name: z.string(),
    message: z.string(),
    groupStart: z.optional(z.boolean()),
    type: z.string(),
    timeout: z.number(),
    event: z.boolean(),
    id: z.string(),
    state: z.string(),
    instrument: z.string(),
    url: z.string(),
    wallClockStartedAt: z.string(),
    ended: z.boolean(),
    snapshotID: z.number(),
    group: z.optional(z.string()),
    err: z.optional(ErrorSchema)
  });

const StepSchema = z.object({
    options: OptionsSchema
})

const StepsSchema = z.array(StepSchema)

export type StepType = z.infer<typeof OptionsSchema>;

const mapStepData = (steps: unknown) => {
    const orderedSteps = StepsSchema.parse(steps).sort((a, b) => 
        new Date(a.options.wallClockStartedAt).getTime() - new Date(b.options.wallClockStartedAt).getTime());

    const filteredData = orderedSteps
        .filter((s) => s.options.state !== 'pending')
        .filter((s) => !['log', 'task'].includes(s.options.name))
        .map(({ options }) => options);

    return filteredData;
}

export default mapStepData;
