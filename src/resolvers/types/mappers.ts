export interface ConsoleLogEventModel {
    __typename: 'ConsoleLogEvent',
    id: string,
}

export type TestExecutionEvent =
    | ConsoleLogEventModel;

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
