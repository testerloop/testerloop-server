import { GitHubUserResolvers } from './types/generated.js';

const resolvers: GitHubUserResolvers = {
    avatar: ({ avatar }) => avatar,
    username: ({ username }) => username,
    name: ({ name }) => name,
    url: ({ url }) => url
};

export default resolvers;
