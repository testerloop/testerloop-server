import getPaginatedData from '../util/getPaginatedData.js';
import { ScenarioEventResolvers } from './types/generated.js';

const resolvers: ScenarioEventResolvers = {
    async at({ id }, _args, { dataSources }) {
        const result = await dataSources.testResults.getById(id);
        return new Date(result.startedTestsAt)
    },
    async until({ id }, _args, { dataSources }) {
        const result = await dataSources.testResults.getById(id);
        return new Date(result.endedTestsAt)
    },
    async steps({ id }, _args, { dataSources }) {
        const steps = await dataSources.stepEvent.getStepsByTestExecutionId(id);
        return getPaginatedData(Object.values(steps))
    },
    async definition({ id }, _args, { dataSources }) {
        const result = await dataSources.testResults.getById(id);
        return {
            __typename: 'ScenarioDefinition',
            description: result.runs[0].tests[0].title.slice(-1)[0]
        }
    },
    async testExecution({ id }, _args) {
        const [runId, _] = id.split('/');
        return {
            __typename: 'TestExecution',
            id,
            testRun: {
                __typename: 'TestRun',
                id: runId
            }
        };
    },
}

export default resolvers;
