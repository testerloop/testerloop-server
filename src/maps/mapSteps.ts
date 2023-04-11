import { z } from 'zod';
import { GherkinStepKeyword, StepEvent } from '../resolvers/types/generated.js';

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
    group: z.optional(z.string())
  });

const StepSchema = z.object({
    options: OptionsSchema
})

const StepsSchema = z.array(StepSchema)

type StepType = z.infer<typeof StepSchema>;

const mapSteps = (steps: unknown, testExecutionId: string) => {
    const orderedSteps = StepsSchema.parse(steps).sort((a, b) => 
        new Date(a.options.wallClockStartedAt).getTime() - new Date(b.options.wallClockStartedAt).getTime());

    const filteredData = orderedSteps
        .filter((s) => s.options.state !== 'pending')
        .filter((s) => !['log', 'task'].includes(s.options.name));

    const filteredSteps: StepType[] = filteredData.filter(({ options }) => options.groupStart);
    const commands = filteredSteps.filter(
        ({ options }) => !options.groupStart
    );

    const hierarchy = filteredSteps.map((step) => ({
        step,
        commands: [] as StepType[],
    }));

    const stepIdxById: Record<string,number> = filteredSteps.reduce(
        (acc, step, idx) => ({
            ...acc,
            [step.options.id]: idx,
        }),
        {}
    );

    commands.forEach((command) => {
        const stepId = command.options.group;

        if (!stepId) {
            throw new Error(
                `The following command does not have a linked step: ${command}`
            );
        }

        const stepIdx = stepIdxById[stepId];
        hierarchy[stepIdx].commands.push(command);
    });  
        
    const mappedSteps = hierarchy.reduce((acc, curr, i) => {
        const id = `${testExecutionId}/step/${i + 1}`;

        return {
            ...acc,
            [id]: {
                ...curr.step.options,
                id,
                __typename: 'StepEvent' as const,
                definition: {
                    __typename: 'StepDefinition' as const,
                    description: 'descr',
                    keyword: GherkinStepKeyword.Given,
                },
                at: new Date(curr.step.options.wallClockStartedAt),
                until: new Date(), //update
                commandChains: {
                    totalCount: 1,
                    hasNextPage: false,
                    hasPreviousPage: false,
                    edges: curr.commands.map((command) => 
                        [{__typename:'CommandEvent', node: {__typename: 'CommandChain', id: '1'}, cursor: '1'}])
                } as any
            }
        }
    }, {} as Record<string, Omit<StepEvent, 'testExecution'>>)

    return mappedSteps;
}

export default mapSteps;
