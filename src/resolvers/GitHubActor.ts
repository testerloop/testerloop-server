import { GitHubActorResolvers } from './types/generated.js';

const resolvers: GitHubActorResolvers = {
    name: ({ name }) => name,
    email: ({ email }) => email,
    user: ({ user }) => user,
};

export default resolvers;
