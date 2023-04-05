import config from '../config.js';
import S3Service from '../S3Service.js';

export const getCicdFile = async (runId: string) => {
    const bucketName = config.AWS_BUCKET_NAME;
    const cicd = await S3Service.getObject(bucketName, `${runId}/logs/cicd.json`)
    return cicd;
}
export class TestCodeRevision {
    async getById(id: string) {
        const cicd = await getCicdFile(id);

        return {
            __typename: 'GitHubRevision' as const,
            repository: {
                _unused: false,
            },
            branch: {
                __typename: 'GitHubBranch' as const,
                repository: {
                     __typename: 'GitHubRepository' as const ,
                    _unused: false, 
                    owner: {
                        __typename: 'GitHubRepositoryOwner' as const,
                        name: cicd.GITHUB_REPOSITORY_OWNER,
                        url: [cicd.GITHUB_SERVER_URL, cicd.GITHUB_REPOSITORY_OWNER].join('/')
                    }, 
                    name: cicd.GITHUB_REPOSITORY, 
                    url: [cicd.GITHUB_SERVER_URL, cicd.GITHUB_REPOSITORY].join('/')
                },
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
                    username: cicd.commiter.name,
                    url: [cicd.GITHUB_SERVER_URL, cicd.commiter.name].join('/')
                }
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
                }
            },
            url: [cicd.gitUrl, 'commit', cicd.hash].join('/')
        };
    }
}
