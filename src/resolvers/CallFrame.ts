import { CallFrameResolvers } from './types/generated'

const resolvers: CallFrameResolvers = {
    id: ({ id }) => id,
    functionName: (parent) => parent.functionName,
    lineNumber: (parent) => parent.lineNumber,
    url: (parent) => parent.url,
};

export default resolvers
