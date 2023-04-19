import { StepType } from "../../maps/mapStepData";
import { CommandEvent } from "./generated";

export interface ConsoleLogEventModel {
    __typename: 'ConsoleLogEvent',
    id: string,
}

export interface HttpNetworkEventModel {
    __typename: 'HttpNetworkEvent',
    id: string,
}

export interface StepEventModel extends StepType {
    __typename: 'StepEvent',
    _id: string,
    at: Date,
    until: Date,
}

export interface ScenarioEventModel {
    __typename: 'ScenarioEvent',
    id: string,
}

export interface TestExecutionSnapshotModel {
    __typename: 'TestExecutionSnapshot',
    at: Date,
    dom: string,
    testExecutionId: string
}

export interface CommandEventModel extends StepType {
    __typename: 'CommandEvent',
    id: string,
    at: Date,
    until: Date,
}

export interface CommandChainEventModel {
    __typename: 'CommandChainEvent',
    id: string,
    at: Date,
    until: Date
    commands: CommandEventModel[]
}

export interface CommandEventEdgeModel {
    cursor: string,
    node: CommandEventModel,
}

export interface CommandEventConnectionModel {
    edges: CommandEventEdgeModel[],
    totalCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
}

export interface StepEventEdgeModel {
    cursor: string,
    node: StepEventModel,
}

export interface StepEventConnectionModel {
    edges: StepEventEdgeModel[],
    totalCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
}


export interface CommandChainEventEdgeModel {
    cursor: string,
    node: CommandChainEventModel,
}

export interface CommandChainEventConnectionModel {
    edges: CommandChainEventEdgeModel[],
    totalCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
}

export type TestExecutionEvent =
    | ConsoleLogEventModel
    | HttpNetworkEventModel 
    | ScenarioEventModel
    | StepEventModel
    | CommandEventModel;
    
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
