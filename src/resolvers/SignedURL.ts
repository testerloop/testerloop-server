import { SignedUrlResolvers } from './types/generated.js';

const resolvers: SignedUrlResolvers = {
    url: ({ url }) => url,
    expiresAt: ({ expiresAt }) => expiresAt,
};

export default resolvers;
