import { GitHubRevisionFileLineColumnResolvers } from './types/generated';

const resolvers: GitHubRevisionFileLineColumnResolvers = {
    column: ({ column }) => column,
    line: ({ line }) => line,
};

export default resolvers;
