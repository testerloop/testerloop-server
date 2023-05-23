import { StackTraceResolvers, ConsoleLogEvent } from './types/generated';



const resolvers: StackTraceResolvers = {
    id: ({ id }) => id,
    callFrames: (parent) => parent.callFrames,
};

export default resolvers
