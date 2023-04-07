export interface ConsoleLogEventModel {
    __typename: 'ConsoleLogEvent',
    id: string,
}

export interface HttpNetworkEventModel {
    __typename: 'HttpNetworkEvent',
    id: string,
}

export type TestExecutionEvent =
    | ConsoleLogEventModel
    | HttpNetworkEventModel;
    
export interface TestRunModel {
    __typename: 'TestRun',
    id: string,
}

export interface TestExecutionModel {
    __typename: 'TestExecution',
    id: string,
    testRun: TestRunModel,
}

export interface TestExecutionEventEdgeModel {
    cursor: string,
    node: TestExecutionEvent,
}

export interface TestExecutionEventConnectionModel {
    edges: TestExecutionEventEdgeModel[],
    totalCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
}

export interface GitHubRevisionModel {
    __typename: 'GitHubRevision';
    repository: GitHubRepository;
    branch: GitHubBranch;
    committer: GitHubActor;
    author: GitHubActor;
    url: string;
    hash: string;
    shortHash: string;
}
  
export interface GitHubRepositoryOwner {
    __typename: 'GitHubRepositoryOwner';
    name: string;
    url: string;
}

export interface GitHubRepository {
    __typename: 'GitHubRepository';
    _unused: boolean;
    name: string;
    owner: GitHubRepositoryOwner;
    url: string;
}
  
export interface GitHubBranch {
    __typename: 'GitHubBranch';
    repository: GitHubRepository;
    name: string;
    url: string;
}
  
export interface GitHubActor {
    __typename: 'GitHubActor';
    name: string;
    email: string;
    user: GitHubUser;
}
  
export interface GitHubUser {
    __typename: 'GitHubUser';
    avatar: string | null;
    username: string;
    name: string;
    url: string;
}
