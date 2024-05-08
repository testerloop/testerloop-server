import { JobStatusResolvers } from './types/generated.js';

const resolvers: JobStatusResolvers = {
    fileName: ({ fileName }) => fileName,
    status: ({ status }) => status,
    lastRun: ({ lastRun }) => lastRun,
};

export default resolvers;
