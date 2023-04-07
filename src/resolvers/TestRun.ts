import { encodeId } from '../util/id.js';
import { TestRunResolvers } from './types/generated.js';

const resolvers: TestRunResolvers = {
    id({ id }) {
        return encodeId('TestRun', id);
    },
    async testCodeRevision ({ id }, _args, {dataSources}) {
        return dataSources.testCodeRevision.getById(id);
      },
}

export default resolvers;
