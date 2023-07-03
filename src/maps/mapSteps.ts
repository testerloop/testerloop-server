import { CommandEventStatus, GherkinStepKeyword } from '../resolvers/types/generated.js';
import mapStepData, { StepType } from './mapStepData.js';

const isGherkinStepKeyword = (stepName: string): stepName is GherkinStepKeyword => Object.values(GherkinStepKeyword as Record<string, string>).includes(stepName)

const mapSteps = (steps: unknown, testExecutionId: string, endedTestsAt: Date) => {
    const filteredData = mapStepData(steps);

    const mappedSteps: (StepType &
        {
            __typename: 'StepEvent',
            _id: string,
            name: GherkinStepKeyword,
            at: Date,
            until: Date,
            status: CommandEventStatus,
            commandChains:
                {
                    __typename: 'CommandChainEvent',
                    id: string,
                    at: Date,
                    until: Date,
                    commands: (StepType &
                        {__typename: 'CommandEvent',
                        at: Date,
                        until: Date,
                    })[]
                }[]
        }
        )[] = [];

    for (const [i, item] of filteredData.entries()) {
        const until = i < filteredData.length - 1 ? new Date(filteredData[i+1].wallClockStartedAt) : endedTestsAt;
        const at = new Date(item.wallClockStartedAt);
        const maybeGherkinName = item.name.trim().toUpperCase();

        if (item.groupStart && isGherkinStepKeyword(maybeGherkinName)) {
            if(mappedSteps.length){
                const lastStep = mappedSteps[mappedSteps.length - 1]
                lastStep.until = at
            }

            mappedSteps.push({
                __typename: 'StepEvent',
                _id: `${testExecutionId}/step/${item.id}`,
                ...item,
                name: maybeGherkinName,
                at,
                until,
                status: item.state === 'failed'? CommandEventStatus.Failed : CommandEventStatus.Success,
                commandChains: [],
            });
            continue;
        }

        const step = mappedSteps[mappedSteps.length - 1];

        const command = {
            __typename: 'CommandEvent' as const,
            at,
            until,
            ...item,
            id: `${testExecutionId}/commandEvent/${item.id}`
        };
        if(command.state === 'failed'){
            step.status = CommandEventStatus.Failed;
        }
        
        if (step) {
            step.commandChains.push({
                __typename: 'CommandChainEvent',
                at,
                until,
                id: `${testExecutionId}/commandChain/${i + 1}`,
                commands: [command],
            });
        }
    }

    mappedSteps[mappedSteps.length - 1].until = endedTestsAt

    return Object.fromEntries(
        mappedSteps.map((obj) => [
            obj._id,
            obj
        ])
      );
}

export default mapSteps;
