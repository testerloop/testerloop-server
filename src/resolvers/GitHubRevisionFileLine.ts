import { GitHubRevisionFileLineResolvers } from "./types/generated";

const resolvers: GitHubRevisionFileLineResolvers = {
    url: ({ url }) => url,
    file: ({ file }) => file,
    line: ({ line }) => line,
};

export default resolvers;
