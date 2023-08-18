import { UserResolvers } from './types/generated';

const resolvers: UserResolvers = {
    id: ({ id }) => id,
    email: ({ email }) => email,
    cognitoId: ({ cognitoId }) => cognitoId,
};

export default resolvers;
