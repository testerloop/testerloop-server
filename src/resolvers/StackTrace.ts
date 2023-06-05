import { StackTraceResolvers } from './types/generated';
import { assertNonNull } from '../util/assertNonNull.js';


const resolvers: StackTraceResolvers = {
    id: ({ id }) => id,
    async callFrames(parent, _args, { dataSources }) {
        const id = parent.id;
        const event = assertNonNull(await dataSources.consoleEvent.getById(id));
        const callFrames = event.stackTrace.callFrames.map((callFrame, idx) => ({
            __typename: 'CallFrame' as const,
            id: `${event.id}/stack/${idx}`,
            ...callFrame,
        }));
        return callFrames;
    },
};

export default resolvers;
