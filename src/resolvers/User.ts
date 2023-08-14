import { UserResolvers } from './types/generated';

const resolvers: UserResolvers = {
    id: ({ id }) => id,
    email: ({ email }) => email,
    firstName: ({ firstName }) => firstName,
    lastName: ({ lastName }) => lastName,
};

export default resolvers;
