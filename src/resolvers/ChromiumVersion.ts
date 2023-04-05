import { ChromiumVersionResolvers } from './types/generated.js';

const resolvers: ChromiumVersionResolvers = {
    major: ({ major }) => major,
    minor: ({ minor }) => minor,
    patch: ({ patch }) => patch,
    build: ({ build }) => build
};

export default resolvers;
