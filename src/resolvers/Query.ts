import { decodeId, decodeIdForType } from '../util/id.js';
import { QueryResolvers } from './types/generated.js';
import { RunStatus, TestOutcome } from './types/generated.js';

const resolvers: QueryResolvers = {
    async httpNetworkEvent(root, { id }, { dataSources }) {
        const decodedId = decodeIdForType('NetworkEvent', id);
        if (!decodedId) {
            return null;
        }
        const event = await dataSources.networkEvent.getById(decodedId);
        if (!event) {
            return null;
        }
        return event;
    },
    async testExecution(root, { id }, { dataSources }) {
        const decodedId = decodeIdForType('TestExecution', id);
        if (!decodedId) {
            return null;
        }
        const testExecution = await dataSources.testExecution.getById(
            decodedId
        );
        if (!testExecution) {
            return null;
        }
        const [runId, _] = id.split('/');
        return {
            __typename: 'TestExecution',
            id: testExecution.id,
            testRun: {
                __typename: 'TestRun',
                id: runId,
            },
        };
    },
    async testRun(root, { id }, { dataSources }) {
        const decodedId = decodeIdForType('TestRun', id);
        if (!decodedId) {
            return null;
        }
        const { totalCount } = await dataSources.testExecution.getByTestRunId(
            decodedId,
            {}
        );
        if (totalCount === 0) {
            return null;
        }
        return {
            __typename: 'TestRun',
            id: decodedId,
        };
    },
    async testRuns(root, { first, after }, { dataSources }) {
        const { edges, hasNextPage, hasPreviousPage, totalCount } =
            await dataSources.testRun.getAll({ first, after });

        return {
            edges: edges.map(({ cursor, node }) => ({
                cursor,
                node: {
                    __typename: 'TestRun',
                    id: node.id,
                },
            })),
            hasNextPage,
            hasPreviousPage,
            totalCount,
        };
    },

    async consoleLogEvent(root, { id }, { dataSources }) {
        const decodedId = decodeIdForType('ConsoleLogEvent', id);
        if (!decodedId) {
            return null;
        }
        return {
            __typename: 'ConsoleLogEvent',
            id: decodedId,
        };
    },

    async node(root, { id }, context, info) {
        const decodedId = decodeId(id);
        if (!decodedId) {
            return null;
        }
        const [typename, _internalId] = decodedId;

        switch (typename) {
            case 'TestExecution':
                return resolvers.testExecution(root, { id }, context, info);
            case 'TestRun':
                return resolvers.testRun(root, { id }, context, info);
            case 'ConsoleLogEvent':
                return resolvers.consoleLogEvent(root, { id }, context, info);
            default:
                return null;
        }
    },

    async getRun(parent, { runId }, { dataSources }) {
        const testExecutions = await dataSources.testExecution.getByTestRunId(
            runId,
            {}
        );
        console.log('executions ', testExecutions);

        const testExecutionStatuses = await Promise.all(
            testExecutions.edges.map(async (testExecution, idx) => {
                console.log('testExecution ', testExecution);

                const fileExists = await dataSources.testResults.doResultsExist(
                    `${runId}/${testExecution.node.id}`
                );

                if (fileExists) {
                    const testResults = await dataSources.testResults.getById(
                        `${runId}/${testExecution.node.id}`
                    );
                    console.log('testResults ', testResults);
                    let runStatus;
                    let testOutcome;
                    const testName =
                        testResults.runs[0].tests[0].title.slice(-1)[0] ?? '';
                    console.log('testName ', testName);

                    if (testResults) {
                        if (testResults.status === 'finished') {
                            runStatus = RunStatus.Completed;
                            testOutcome = testResults.runs[0].tests.every(
                                (test) => test.state === 'passed'
                            )
                                ? TestOutcome.Passed
                                : TestOutcome.Failed;
                        } else {
                            runStatus = RunStatus.Running;
                            testOutcome = TestOutcome.NotYetCompleted;
                        }
                    } else {
                        runStatus = RunStatus.Queued;
                        testOutcome = TestOutcome.NotYetCompleted;
                    }

                    return {
                        __typename: 'TestExecutionStatus' as const,
                        runStatus,
                        testOutcome,
                        name: testName,
                        id: testExecution.node.id,
                    };
                } else {
                    return {
                        __typename: 'TestExecutionStatus' as const,
                        runStatus: RunStatus.Running,
                        testOutcome: TestOutcome.NotYetCompleted,
                        name: '',
                        id: testExecution.node.id,
                    };
                }
            })
        );

        const runStatus = testExecutionStatuses.every(
            (status) => status.runStatus === RunStatus.Completed
        )
            ? RunStatus.Completed
            : RunStatus.Running;

        return {
            __typename: 'TestRunStatus',
            status: runStatus,
            testExecutions: testExecutionStatuses,
        };
    },
};

export default resolvers;
