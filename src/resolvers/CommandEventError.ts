import { CommandEventErrorResolvers } from './types/generated.js';

const resolvers: CommandEventErrorResolvers = {
    type: ({type}) => type,
    message: ({ message }) => message,
    stackTrace: ({ stackTrace }) => stackTrace,
    url: ({ url }) => url,
    urlText: ({ urlText }) => urlText
}

export default resolvers;
