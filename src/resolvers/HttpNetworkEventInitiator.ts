import { HttpNetworkEventInitiatorResolvers } from './types/generated.js';

const resolvers: HttpNetworkEventInitiatorResolvers = {
    lineNo: ({ lineNo }) => (lineNo),
    origin: ({ origin }) => (origin),
};

export default resolvers;
