import { GitHubRevisionFileResolvers } from './types/generated.js';

const resolvers: GitHubRevisionFileResolvers = {
    path: ({ path }) => path,
    revision: ({ revision }) => revision,
};

export default resolvers;
