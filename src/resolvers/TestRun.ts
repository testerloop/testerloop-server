import { encodeId } from '../util/id.js';
import { TestRunResolvers } from './types/generated.js';

const resolvers: TestRunResolvers = {
    id({ id }) {
        return encodeId('TestRun', id);
    },
    async title ({ testExecutionId }, _args, {dataSources}) {
        const results = await dataSources.testResults.getById(testExecutionId);
        return results.runs[0].tests[0].title.slice(-1)[0];
    },
    async testCodeRevision ({ id }, _args, {dataSources}) {
        return dataSources.testCodeRevision.getById(id);
      },
}

export default resolvers;
