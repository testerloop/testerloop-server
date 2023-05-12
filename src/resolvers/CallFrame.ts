import { CallFrameResolvers } from './types/generated'

const resolvers: CallFrameResolvers = {
  columnNumber: (parent) => parent.columnNumber,
  functionName: (parent) => parent.functionName,
  lineNumber: (parent) => parent.lineNumber,
  scriptId: (parent) => parent.scriptId,
  url: (parent) => parent.url,
};

export default resolvers