import { GitHubOrganizationResolvers } from './types/generated.js';

const resolvers: GitHubOrganizationResolvers = {
    name: ({ name }) => name,
    url: ({ url }) => url,
};

export default resolvers;
