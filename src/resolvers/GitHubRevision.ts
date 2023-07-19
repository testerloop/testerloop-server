import { GitCommitIdType, GitHubRevisionResolvers } from './types/generated.js';

const resolvers: GitHubRevisionResolvers = {
    author: ({ author }) => author,
    branch: ({ branch }) => branch,
    commitId: ({ hash, shortHash }, { type }) =>
        type === GitCommitIdType?.Long ? hash : shortHash,
    committer: ({ committer }) => committer,
    repository: ({ repository }) => repository,
    url: ({ url }) => url,
};

export default resolvers;
