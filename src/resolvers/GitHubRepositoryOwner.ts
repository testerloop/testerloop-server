import { GitHubRepositoryOwnerResolvers } from './types/generated.js';

const resolvers: GitHubRepositoryOwnerResolvers = {
    name: ({ name }) => name,
    url: ({ url }) => url,
};

export default resolvers;
