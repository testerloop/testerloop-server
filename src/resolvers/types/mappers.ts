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
