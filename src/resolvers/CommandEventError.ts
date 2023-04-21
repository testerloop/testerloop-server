import { CommandEventErrorResolvers } from './types/generated.js';

const resolvers: CommandEventErrorResolvers = {
    type: ({type}) => type,
    message: ({ message }) => message,
    stackTrace: ({ stackTrace }) => stackTrace,
    revisionFile: ({ revisionFile }) => revisionFile,
}

export default resolvers;
