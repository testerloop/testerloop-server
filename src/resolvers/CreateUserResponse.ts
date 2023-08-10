import { CreateUserResponseResolvers } from './types/generated';

const resolvers: CreateUserResponseResolvers = {
    user: ({ user }) => user,
};

export default resolvers;
