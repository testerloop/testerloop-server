import { CommandEventErrorResolvers } from './types/generated.js';

const resolvers: CommandEventErrorResolvers = {
    type: ({ type }) => type,
    message: ({ message }) => message,
    stackTrace: ({ stackTrace }) => stackTrace,
    location: ({ location }) => location,
};

export default resolvers;
