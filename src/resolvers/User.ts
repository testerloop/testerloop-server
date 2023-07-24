import { UserResolvers } from './types/generated';

const resolvers: UserResolvers = {
    id: ({ id }) => id,
};

export default resolvers;
