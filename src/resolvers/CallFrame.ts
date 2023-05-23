import { CallFrameResolvers } from './types/generated'

const resolvers: CallFrameResolvers = {
    id: ({ id }) => id,
    columnNumber: (parent) => parent.columnNumber,
    functionName: (parent) => parent.functionName,
    lineNumber: (parent) => parent.lineNumber,
    url: (parent) => parent.url,
};

export default resolvers
