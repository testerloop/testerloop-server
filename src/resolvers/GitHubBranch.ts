import { GitHubBranchResolvers } from './types/generated.js';

const resolvers: GitHubBranchResolvers = {
    url: ({ url }) => url,
    name: ({ name }) => name,
};

export default resolvers;
