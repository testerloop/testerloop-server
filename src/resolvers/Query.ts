import {
    RunStatus as PrismaRunStatus,
    TestStatus as PrismaTestStatus,
} from '@prisma/client';

import { decodeId, decodeIdForType } from '../util/id.js';

import { QueryResolvers, RunStatus, TestStatus } from './types/generated.js';

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

    async getRunStatus(parent, { runId }, { dataSources, auth, repository }) {
        if (!auth) throw new Error('User is not authenticated.');

        const testRun = await repository.getTestRun(runId);

        if (!testRun) throw new Error('Run does not exist.');

        if (testRun.organisationId !== auth.organisation.id)
            throw new Error(
                'User does not have permission to access this run result',
            );

        if (testRun.status !== PrismaRunStatus.COMPLETED) {
            const s3RunStatus =
                await dataSources.testResults.getTestRunStatusFromS3(runId);
            if (s3RunStatus.runStatus === RunStatus.Completed)
                return s3RunStatus;
        }

        const testExecutionStatuses = testRun.testExecutions.map(
            (execution) => {
                const { id, testName, featureFile, rerunOfId, result } =
                    execution;

                return {
                    __typename: 'TestExecutionStatus' as const,
                    id,
                    testName,
                    featureFile,
                    rerunOfId,
                    testStatus:
                        result === PrismaTestStatus.PASSED
                            ? TestStatus.Passed
                            : TestStatus.Failed,
                };
            },
        );

        const runStatus =
            testRun.status === PrismaRunStatus.COMPLETED
                ? RunStatus.Completed
                : RunStatus.Running;

        return {
            __typename: 'TestRunStatus',
            runStatus,
            testExecutionStatuses,
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
