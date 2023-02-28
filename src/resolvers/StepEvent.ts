import { assertNonNull } from '../util/assertNonNull.js';
import { GherkinStepKeyword, StepEventResolvers } from './types/generated.js';

const resolvers: StepEventResolvers = {
    async at({ id }, _args, { dataSources }) {
        return new Date();
        // const event = assertNonNull(await dataSources.commandChain.getById(id));
        // return event.at;
    },
    async until({ id }, _args, { dataSources }) {
        return new Date();
        // const event = assertNonNull(await dataSources.commandChain.getById(id));
        // return event.until;
    },
    async commandChains() {
        return {
            edges: [],
            hasNextPage: false,
            hasPreviousPage: false,
            totalCount: 0,
        }
    },
    async description() {
        return "I visit overloop's website";
    },
    async keyword() {
        return GherkinStepKeyword.Given;
    },
    async testExecution({ id }, _args, { dataSources }) {
        const event = { testExecutionId: '1234' };//assertNonNull(await dataSources.commandChain.getById(id));
        return {
            __typename: 'TestExecution',
            id: event.testExecutionId,
        };
    },
}

export default resolvers;
