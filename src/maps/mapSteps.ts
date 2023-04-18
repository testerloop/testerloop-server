import { SnapshotType } from './mapSnapshots.js';
import mapStepData, { StepType } from './mapStepData.js';

const mapSteps = (steps: unknown, testExecutionId: string, endedTestsAt: Date) => {
    const filteredData = mapStepData(steps);

    const mappedSteps: (StepType & 
        {   
            __typename: 'StepEvent', 
            _id: string,
            at: Date, 
            until: Date,
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

        
        if (item.groupStart) {
            if(mappedSteps.length){
                const lastStep = mappedSteps[mappedSteps.length - 1]
                lastStep.until = at
            }

            mappedSteps.push({
                __typename: 'StepEvent',
                _id: `${testExecutionId}/step/${i + 1}`,
                ...item, 
                at,
                until,
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
        if (item.type === 'parent') {
            if(step.commandChains.length){
                const lastCommandChain = step.commandChains[step.commandChains.length - 1]
                lastCommandChain.until = at
            }
            step.commandChains.push({
                __typename: 'CommandChainEvent',
                at,
                until,
                id: `${testExecutionId}/commandChain/${i + 1}`,
                commands: [command],
            })
            continue;
        }

        step.commandChains[step.commandChains.length - 1].commands.push(command);
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
