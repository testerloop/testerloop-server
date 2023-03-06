import { NetworkEventTimeResolvers } from './types/generated.js';

const resolvers: NetworkEventTimeResolvers = {
    at: ({ at }) => (at),
    until: ({ until }) => (until),
};

export default resolvers;
