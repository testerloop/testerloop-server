import { GherkinStepKeyword } from '../resolvers/types/generated.js';
import mapStepData, { StepType } from './mapStepData.js';

const mapSteps = (steps: unknown, testExecutionId: string) => {
    const filteredData = mapStepData(steps);

    const filteredSteps: StepType[] = filteredData.filter(({ options }) => options.groupStart);
    const commands = filteredData.filter(
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
                commands: curr.commands.map(({ options }) => options)
            }
        }
    }, {} as Record<string, any>)

    return mappedSteps;
}

export default mapSteps;
