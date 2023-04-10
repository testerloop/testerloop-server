import { encodeId } from '../util/id.js';
import { GherkinStepKeyword, StepEventResolvers } from './types/generated.js';

const resolvers: StepEventResolvers = {
    id({ id }) {
        return encodeId('StepEvent', id);
    },
    async at({ id }, _args, { dataSources }) {
        return new Date()
    },
    async until({ id }, _args, { dataSources }) {
        return new Date()
    },
    async commandChains({ id }, _args, { dataSources }) {
        return {
            __type: 'CommandChainConnection',
            totalCount: 1,
            hasNextPage: false,
            hasPreviousPage: false,
            edges: [{node: {__typename: 'CommandChain', id: '1'}, cursor: '1'}]
        }
    },
    async definition({ id }, _args, { dataSources }) {
        return {
            __typename: 'StepDefinition',
            description: 'desc',
            keyword: GherkinStepKeyword.Given
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
