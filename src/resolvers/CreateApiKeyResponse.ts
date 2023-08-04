import { CreateApiKeyResponseResolvers } from './types/generated';

const resolvers: CreateApiKeyResponseResolvers = {
    apiKey: ({ apiKey }) => apiKey,
};

export default resolvers;
