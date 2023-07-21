import { UserAuthenticationResponseResolvers } from './types/generated';

const resolvers: UserAuthenticationResponseResolvers = {
    id: ({ id }) => id,
};

export default resolvers;
