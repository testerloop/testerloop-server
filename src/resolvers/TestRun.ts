import { assertNonNull } from '../util/assertNonNull.js';
import { encodeId } from '../util/id.js';
import { TestRunResolvers } from './types/generated.js';

const resolvers: TestRunResolvers = {
    id({ id }) {
        return encodeId('TestRun', id);
    },
    async testCodeRevision ({ id }, _args, { dataSources }) {
        const testCodeRevision = await dataSources.testCodeRevision.getById(id);

        return testCodeRevision
      },
}

export default resolvers;
