import {
    RunStatus as PrismaRunStatus,
    TestStatus as PrismaTestStatus,
    WorkerStatus as PrismaWorkerStatus,
} from '@prisma/client';

import { decodeId, decodeIdForType } from '../util/id.js';

import {
    QueryResolvers,
    RunStatus,
    TestStatus,
    WorkerStatus,
} from './types/generated.js';
import { Executor } from './types/generated';

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
    async testExecution(root, { id }, { repository }) {
        const decodedId = decodeIdForType('TestExecution', id);
        if (!decodedId) {
            return null;
        }
        const [runId, testExecutionId] = decodedId.split('/');

        const testExecution =
            await repository.testExecution.getTestExecutionById(
                testExecutionId,
            );
        if (!testExecution) {
            return null;
        }
        return {
            __typename: 'TestExecution',
            id: decodedId,
            testRun: {
                __typename: 'TestRun',
                id: runId,
            },
        };
    },
    async testRun(root, { id }, { repository }) {
        const decodedId = decodeIdForType('TestRun', id);
        if (!decodedId) {
            return null;
        }
        const testExecutions =
            await repository.testExecution.getTestExecutionsbyRunId(decodedId);
        if (!testExecutions) {
            return null;
        }
        return {
            __typename: 'TestRun',
            id: decodedId,
        };
    },
    async testRuns(root, { first, after }, { dataSources }) {
        const { edges, hasNextPage, hasPreviousPage, totalCount } =
            await dataSources.testRun.getAll({
                first,
                after,
            });

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

    async getRunStatus(parent, { runId }, { auth, repository }) {
        if (!auth) throw new Error('User is not authenticated.');

        const testRun = await repository.testRun.getTestRunWithExecutions(
            runId,
        );

        if (testRun.organisationId !== auth.organisation.id)
            throw new Error(
                'User does not have permission to access this run result',
            );

        const testStatusMap = {
            [PrismaTestStatus.PASSED]: TestStatus.Passed,
            [PrismaTestStatus.FAILED]: TestStatus.Failed,
            [PrismaTestStatus.IN_PROGRESS]: TestStatus.InProgress,
        };

        const testExecutionStatuses = testRun.testExecutions.map(
            (execution) => {
                const { id, testName, featureFile, rerunOfId, result } =
                    execution;

                const testStatus = testStatusMap[result];

                return {
                    __typename: 'TestExecutionStatus' as const,
                    id,
                    testName,
                    featureFile,
                    rerunOfId,
                    testStatus,
                };
            },
        );

        const workers = await repository.worker.getWorkersByRunId(runId);
        const totalWorkers = workers.length;
        const totalPendingWorkers = workers.filter(
            (worker) => worker.status === PrismaWorkerStatus.PENDING,
        ).length;
        const totalActiveWorkers = workers.filter(
            (worker) => worker.status === PrismaWorkerStatus.STARTED,
        ).length;
        const totalCompletedWorkers = workers.filter(
            (worker) => worker.status === PrismaWorkerStatus.COMPLETED,
        ).length;

        const runStatus =
            testRun.status === PrismaRunStatus.COMPLETED
                ? RunStatus.Completed
                : RunStatus.Running;

        return {
            __typename: 'TestRunStatus',
            runStatus,
            totalWorkers,
            totalPendingWorkers,
            totalActiveWorkers,
            totalCompletedWorkers,
            testExecutionStatuses,
        };
    },

    async worker(root, { id }, { repository }) {
        const worker = await repository.worker.getWorker(id);

        const testExecutions = await Promise.all(
            (
                await repository.testExecution.getTestExecutionsByWorkerId(id)
            ).map(async (execution) => ({
                __typename: 'TestExecution' as const,
                id: execution.id,
                testRun: {
                    __typename: 'TestRun' as const,
                    id: execution.testRunId,
                },
            })),
        );

        return {
            __typename: 'Worker',
            ...worker,
            status: worker.status as WorkerStatus,
            executor: worker.executor as Executor,
            testExecutions,
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
