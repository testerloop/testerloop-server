import { decodeId, decodeIdForType } from '../util/id.js';

import { QueryResolvers, RunStatus } from './types/generated.js';

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
            decodedId,
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
            {},
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

    async consoleLogEvent(root, { id }) {
        const decodedId = decodeIdForType('ConsoleLogEvent', id);
        if (!decodedId) {
            return null;
        }
        return {
            __typename: 'ConsoleLogEvent',
            id: decodedId,
        };
    },

    async getRun(parent, { runId }, { dataSources }) {
        const testExecutions = await dataSources.testExecution.getByTestRunId(
            runId,
            {},
        );

        if (testExecutions.totalCount === 0) {
            return {
                __typename: 'TestRunStatus' as const,
                status: RunStatus.Queued,
                testExecutions: [],
            };
        }

        const testExecutionStatuses =
            await dataSources.testResults.getTestExecutionStatuses(
                testExecutions,
                runId,
            );

        const isRunCompleted = testExecutionStatuses.every(
            (status) => status.runStatus === RunStatus.Completed,
        );

        const runStatus = isRunCompleted
            ? RunStatus.Completed
            : RunStatus.Running;

        return {
            __typename: 'TestRunStatus' as const,
            status: runStatus,
            testExecutions: testExecutionStatuses,
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
};

export default resolvers;
