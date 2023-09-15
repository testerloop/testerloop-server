import { TestRunStatusUpdatedEventResolvers } from './types/generated.js';

const resolvers: TestRunStatusUpdatedEventResolvers = {
    at: ({ at }) => at,
    testRun: ({ testRun }) => testRun,
};

export default resolvers;
