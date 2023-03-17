import { NetworkEventTimingResolvers } from './types/generated.js';

const resolvers: NetworkEventTimingResolvers = {
    at: ({ at }) => at,
    until: ({ until }) => until,
};

export default resolvers;
