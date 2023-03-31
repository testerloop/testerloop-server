import { decodeId, decodeIdForType } from '../util/id.js';
import { QueryResolvers } from './types/generated.js';

const resolvers: QueryResolvers = {
    test: () => true,
    async httpNetworkEvent(root, { id }, { dataSources }) {
        const decodedId = decodeIdForType('NetworkEvent', id);
        if(!decodedId){
            return null;
        }
        const event = await dataSources.networkEvent.getById(decodedId);
        if (!event) {
            return null;
        }
        return event;
    },
    async testExecution(root, { id }, { dataSources }) {
        const decodedId = decodeIdForType('TestExecution', id);
        if (!decodedId) {
            return null;
        }
        const testExecution = await dataSources.testExecution.getById(decodedId);
        if (!testExecution) {
            return null;
        }
        const [runId, _] = id.split('/');
        return {
            __typename: 'TestExecution',
            id: testExecution.id,
            testRun: {
                __typename: 'TestRun',
                id: runId
            }
        };
    },
    async node(root, { id }, context, info) {
        const decodedId = decodeId(id);
        if (!decodedId) {
            return null;
        }
        const [typename, _internalId] = decodedId;

        switch (typename) {
            case 'TestExecution':
                return resolvers.testExecution(root, { id }, context, info);
            default:
                return null;
        }
    },
};

export default resolvers;
