import { HttpNetworkEventInitiatorResolvers } from './types/generated.js';

const resolvers: HttpNetworkEventInitiatorResolvers = {
    lineNumber: ({ lineNumber }) => lineNumber,
    origin: ({ origin }) => origin,
};

export default resolvers;
