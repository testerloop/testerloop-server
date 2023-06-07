import { StackTraceResolvers } from './types/generated';
import { assertNonNull } from '../util/assertNonNull.js';


const resolvers: StackTraceResolvers = {
    id: ({ id }) => `${id}/stack`,
    async callFrames(parent, _args, { dataSources }) {
        const eventId = parent.id
        const event = assertNonNull(await dataSources.consoleEvent.getById(eventId));
        const callFrames = event.stackTrace.callFrames.map((callFrame, idx) => ({
            __typename: 'CallFrame' as const,
            id: `${event.id}/stack/${idx}`,
            ...callFrame,
        }));
        return callFrames;
    },
};

export default resolvers;
