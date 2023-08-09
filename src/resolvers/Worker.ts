import { assertNonNull } from '../util/assertNonNull.js';

import { WorkerResolvers, WorkerStatus, Executor } from './types/generated.js';

const resolvers: WorkerResolvers = {
    async id({ id }) {
        return id;
    },
    async status({ id }, _args, { repository }) {
        const worker = assertNonNull(await repository.worker.getWorker(id));
        return worker.status as WorkerStatus;
    },
    async executor({ id }, _args, { repository }) {
        const worker = assertNonNull(await repository.worker.getWorker(id));
        return worker.executor as Executor;
    },
    async createdAt({ id }, _args, { repository }) {
        const worker = assertNonNull(await repository.worker.getWorker(id));
        return worker.createdAt;
    },
    async startedAt({ id }, _args, { repository }) {
        const worker = assertNonNull(await repository.worker.getWorker(id));
        return worker.startedAt || null;
    },
    async completedAt({ id }, _args, { repository }) {
        const worker = assertNonNull(await repository.worker.getWorker(id));
        return worker.completedAt || null;
    },
    async testRunId({ id }, _args, { repository }) {
        const worker = assertNonNull(await repository.worker.getWorker(id));
        return worker.testRunId;
    },
    async testExecutions({ id }, _args, { repository }) {
        const testExecutions =
            await repository.testExecution.getTestExecutionsByWorkerId(id);

        return testExecutions.map((execution) => ({
            __typename: 'TestExecution',
            id: execution.id,
            testRun: {
                __typename: 'TestRun',
                id: execution.testRunId,
            },
        }));
    },
};

export default resolvers;
