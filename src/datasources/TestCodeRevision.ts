import config from '../config.js';
import { Context } from '../context.js';
import { GitHubRepositoryOwner, GitHubUser } from '../resolvers/types/generated.js';
import S3Service from '../S3Service.js';

type User = {
    avatarUrl: string
    name: string
    email: string
}

type Cicd = {
    GITHUB_SERVER_URL: string
    GITHUB_REPOSITORY_OWNER: string
    GITHUB_REPOSITORY: string
    gitBranch: string
    author: User
    committer: User
    gitUrl: string
    hash: string
}

export const getCicdFile = async (runId: string) => {
    const bucketName = config.AWS_BUCKET_NAME;
    const cicd = await S3Service.getObject(bucketName, `${runId}/logs/cicd.json`)
    return cicd;
}
export class TestCodeRevision {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }
    
    async getById(id: string) {
        const cicd = await getCicdFile(id) as Cicd;

        const owner = {
            __typename: 'GitHubRepositoryOwner' as const,
            name: cicd.GITHUB_REPOSITORY_OWNER,
            url: [cicd.GITHUB_SERVER_URL, cicd.GITHUB_REPOSITORY_OWNER].join('/'),
        } as GitHubRepositoryOwner

        const repository = {
            __typename: 'GitHubRepository' as const ,
           _unused: false, 
           owner, 
           name: cicd.GITHUB_REPOSITORY, 
           url: [cicd.GITHUB_SERVER_URL, cicd.GITHUB_REPOSITORY].join('/')
       }

        return {
            __typename: 'GitHubRevision' as const,
            repository,
            branch: {
                __typename: 'GitHubBranch' as const,
                repository,
                name: cicd.gitBranch,
                url: [cicd.gitUrl, 'tree', cicd.gitBranch].join('/')
            },
            // commitId: commitIdType === GitCommitIdType?.Long ? cicd.hash : cicd.shortHash,
            commitId: cicd.hash,
            committer: {
                __typename: 'GitHubActor' as const,
                name: cicd.committer.name,
                email: cicd.committer.email,
                user: {
                    __typename: 'GitHubUser' as const,
                    avatar: cicd.committer.avatarUrl,
                    username: cicd.committer.name,
                    url: [cicd.GITHUB_SERVER_URL, cicd.committer.name].join('/')
                } as GitHubUser
            },
            author: {
                __typename: 'GitHubActor' as const,
                name: cicd.author.name,
                email: cicd.author.email,
                user: {
                    __typename: 'GitHubUser' as const,
                    avatar: cicd.author.avatarUrl,
                    username: cicd.author.name,
                    name: cicd.author.name,
                    url: [cicd.GITHUB_SERVER_URL, cicd.author.name].join('/')
                } as GitHubUser
            },
            url: [cicd.gitUrl, 'commit', cicd.hash].join('/')
        };
    }
}
