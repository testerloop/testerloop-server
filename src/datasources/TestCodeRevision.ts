import DataLoader from 'dataloader';
import config from '../config.js';
import { Context } from '../context.js';
import S3Service from '../S3Service.js';
import * as z from 'zod';

const UserSchema = z.object({
    avatarUrl: z.optional(z.string()),
    name: z.string(),
    email: z.string()
});

const CicdSchema = z.object({
    GITHUB_SERVER_URL: z.string(),
    GITHUB_REPOSITORY_OWNER: z.string(),
    GITHUB_REPOSITORY: z.string(),
    gitBranch: z.string(),
    author: UserSchema,
    committer: UserSchema,
    gitUrl: z.string(),
    hash: z.string(),
    shortHash: z.string()
});


type Cicd = z.infer<typeof CicdSchema>;

export class TestCodeRevision {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    cicdDataByRunIdDataLoader = new DataLoader<string, Cicd>(
        (ids) => Promise.all(ids.map(async (runId) => {
            const bucketName = config.AWS_BUCKET_NAME;
            const cicdRaw = await S3Service.getObject(bucketName, `${runId}/logs/cicd.json`)
            const cicd = CicdSchema.parse(cicdRaw);
            return cicd;
        }))
    )
    async getCicdDataByRunId(runId: string) {
        return this.cicdDataByRunIdDataLoader.load(runId);
    }
    
    async getById(id: string) {
        const cicd = await this.getCicdDataByRunId(id);

        const owner = {
            __typename: 'GitHubRepositoryOwner' as const,
            name: cicd.GITHUB_REPOSITORY_OWNER,
            url: [cicd.GITHUB_SERVER_URL, cicd.GITHUB_REPOSITORY_OWNER].join('/'),
        }

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
            hash: cicd.hash,
            shortHash: cicd.shortHash,
            committer: {
                __typename: 'GitHubActor' as const,
                name: cicd.committer.name,
                email: cicd.committer.email,
                user: {
                    __typename: 'GitHubUser' as const,
                    avatar: cicd.committer?.avatarUrl || null,
                    username: cicd.committer.name,
                    name: cicd.committer.name,
                    url: [cicd.GITHUB_SERVER_URL, cicd.committer.name].join('/')
                }
            },
            author: {
                __typename: 'GitHubActor' as const,
                name: cicd.author.name,
                email: cicd.author.email,
                user: {
                    __typename: 'GitHubUser' as const,
                    avatar: cicd.author.avatarUrl || null,
                    username: cicd.author.name,
                    name: cicd.author.name,
                    url: [cicd.GITHUB_SERVER_URL, cicd.author.name].join('/')
                }
            },
            url: [cicd.gitUrl, 'commit', cicd.hash].join('/')
        };
    }
}
