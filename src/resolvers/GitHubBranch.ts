import { GitHubBranchResolvers } from './types/generated.js';

const resolvers: GitHubBranchResolvers = {
    repository: ({ repository }) => repository,
    url: ({ url }) => url,
    name: ({ name }) => name,
};

export default resolvers;
