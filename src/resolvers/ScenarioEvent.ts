import getPaginatedData from '../util/getPaginatedData.js';

import { ScenarioEventResolvers } from './types/generated.js';

const resolvers: ScenarioEventResolvers = {
    async at({ id }, _args, { dataSources }) {
        const event = await dataSources.scenarioEvent.getById(id);
        return event.at;
    },
    async until({ id }, _args, { dataSources }) {
        const event = await dataSources.scenarioEvent.getById(id);
        return event.until;
    },
    async steps({ id }, _args, { dataSources }) {
        const event = await dataSources.scenarioEvent.getById(id);
        return getPaginatedData(Object.values(event.steps));
    },
    async definition({ id }, _args, { dataSources }) {
        const event = await dataSources.scenarioEvent.getById(id);
        return {
            __typename: 'ScenarioDefinition',
            description: event.description,
        };
    },
    async testExecution({ id }, _args) {
        const [runId, testId] = id.split('/');
        return {
            __typename: 'TestExecution',
            id: testId,
            testRun: {
                __typename: 'TestRun',
                id: runId,
            },
        };
    },
};

export default resolvers;
