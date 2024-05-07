import { JobStatusResolvers } from './types/generated.js';

const resolvers: JobStatusResolvers = {
    fileName: ({ fileName }) => fileName,
    status: ({ status }) => status,
};

export default resolvers;
