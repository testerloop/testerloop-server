import { UserResolvers } from './types/generated';

const resolvers: UserResolvers = {
    id: ({ id }) => id,
    first_name: ({ first_name }) => first_name,
    last_name: ({ last_name }) => last_name,
};

export default resolvers;
