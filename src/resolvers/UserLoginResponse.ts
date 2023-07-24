import { UserLoginResponseResolvers } from './types/generated';

const resolvers: UserLoginResponseResolvers = {
    user: ({ user }) => user,
};

export default resolvers;
