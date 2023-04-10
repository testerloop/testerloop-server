import { assertNonNull } from '../util/assertNonNull.js';
import { ScenarioEventResolvers } from './types/generated.js';

const resolvers: ScenarioEventResolvers = {
    async at({ id }, _args, { dataSources }) {
        return new Date()
    },
    async until({ id }, _args, { dataSources }) {
        return new Date()
    },
    async steps({ id }, _args, { dataSources }) {
        return {
            __typename: 'StepEventConnection',
            totalCount: 1,
            hasNextPage: false,
            hasPreviousPage: false,
            edges: [{node: {__typename: 'StepEvent', id: '1'}, cursor: '1'}]
        }
    },
    async definition({ id }, _args, { dataSources }) {
        return {
            __typename: 'ScenarioDefinition',
            description: 'def'
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
