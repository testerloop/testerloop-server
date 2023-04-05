import { GitHubRevisionResolvers } from './types/generated.js';

const resolvers: GitHubRevisionResolvers = {
    author: ({ author }) => author,
    branch: ({ branch }) => branch,
    commitId: ({ commitId }) => commitId,
    committer: ({ committer }) => committer,
    repository: ({ repository }) => repository,
    url: ({ url }) => url,
};

export default resolvers;
