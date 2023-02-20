import { assertNonNull } from '../util/assertNonNull.js';
import { encodeId } from '../util/id.js';
import { TestExecutionResolvers } from './types/generated.js';

const resolvers: TestExecutionResolvers = {
    async at({ id }, _args, { dataSources }) {
        const testExecution = assertNonNull(await dataSources.testExecution.getById(id));
        return testExecution.at;
    },
    events({ id }, { after, first, type, logLevel }, { dataSources }) {
        return dataSources.testExecution.getEvents(id, { after, first, type, logLevel });
    },
    id({ id }) {
        return encodeId('TestExecution', id);
    },
    async until({ id }, _args, { dataSources }) {
        const testExecution = assertNonNull(await dataSources.testExecution.getById(id));
        return testExecution.until;
    },
}

export default resolvers;
