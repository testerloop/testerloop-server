export interface ConsoleLogEventModel {
    __typename: 'ConsoleLogEvent',
    id: string,
}

export interface StepEventModel {
    __typename: 'StepEvent',
    id: string,
}

export interface CommandChainModel {
    __typename: 'CommandChain',
    id: string,
}

export interface CommandChainEdgeModel {
    cursor: string,
    node: CommandChainModel,
}

export interface CommandChainConnectionModel {
    edges: CommandChainEdgeModel[],
    totalCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
}

export interface GenericCommandEventModel {
    __typename: 'GenericCommandEvent',
    id: string,
}

export type CommandEventModel =
    | GenericCommandEventModel;

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

export type TestExecutionEvent =
    | ConsoleLogEventModel
    | StepEventModel
    | CommandChainModel
    | CommandEventModel;

export interface TestExecutionModel {
    __typename: 'TestExecution',
    id: string,
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
