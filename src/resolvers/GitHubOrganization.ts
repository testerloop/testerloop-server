import { GitHubOrganizationResolvers } from './types/generated.js';

const resolvers: GitHubOrganizationResolvers = {
    name: ({ name }) => name,
    slug: ({ slug }) => slug,
    url: ({ url }) => url,
};

export default resolvers;
