import { TestCreationResponseResolvers } from './types/generated';

const resolvers: TestCreationResponseResolvers = {
    testID: ({ testID }) => testID,
};

export default resolvers;
