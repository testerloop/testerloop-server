import { Context } from '../context.js';

export class ScenarioEvent {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async getScenarioEventByTestExecutionId(id: string) {
        const [steps, results] = await Promise.all([
            this.context.dataSources.stepEvent.getStepsByTestExecutionId(id),
            this.context.dataSources.testResults.getResultsByTestExecutionId(id)
        ])
        const scenarioId =  `${id}/scenarioEvent/0`;

        return {
                [scenarioId]: {
                    id: scenarioId,
                    __typename: 'ScenarioEvent' as const,
                    at: new Date(results.startedTestsAt),
                    until: new Date(results.endedTestsAt),
                    description: results.runs[0].tests[0].title.slice(-1)[0],
                    steps
            }
        }
    }

    async getById(id: string) {
        const [runId, requestId, _] = id.split('/');
        const scenarios = await this.getScenarioEventByTestExecutionId(`${runId}/${requestId}`);
        return scenarios[id] ?? null;
    }
}
