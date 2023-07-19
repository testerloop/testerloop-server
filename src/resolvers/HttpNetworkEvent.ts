import { assertNonNull } from '../util/assertNonNull.js';
import { encodeId } from '../util/id.js';

import { HttpNetworkEventResolvers } from './types/generated';

const resolvers: HttpNetworkEventResolvers = {
    id({ id }) {
        return encodeId('NetworkEvent', id);
    },
    async at({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.networkEvent.getById(id));
        return event.at;
    },
    async until({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.networkEvent.getById(id));
        return event.until;
    },
    async initiator({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.networkEvent.getById(id));
        return event.initiator;
    },
    async resourceType({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.networkEvent.getById(id));
        return event.resourceType;
    },
    async request({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.networkEvent.getById(id));
        return event.request;
    },
    async response({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.networkEvent.getById(id));
        return event.response;
    },
    async timings({ id }, _args, { dataSources }) {
        const event = assertNonNull(await dataSources.networkEvent.getById(id));
        return event.timings;
    },
    async testExecution({ id }, _args) {
        const [runId, testExecutionId] = id.split('/');
        return {
            __typename: 'TestExecution',
            id: `${runId}/${testExecutionId}`,
            testRun: {
                __typename: 'TestRun',
                id: runId,
            },
        };
    },
};

export default resolvers;
