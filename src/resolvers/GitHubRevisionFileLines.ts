import { GitHubRevisionFileLinesResolvers } from "./types/generated";

const resolvers: GitHubRevisionFileLinesResolvers = {
    url: ({ url }) => url,
    file: ({ file }) => file,
    startLine: ({ startLine }) => startLine,
    endLine: ({ endLine }) => endLine,
};

export default resolvers;
