import { GitHubRepositoryResolvers } from './types/generated.js';

const resolvers: GitHubRepositoryResolvers = {
    name: ({ name }) => name,
    url: ({ url }) => url,
    owner: ({ owner }) => owner,
    _unused: ({ _unused }) => _unused,
};

export default resolvers;
