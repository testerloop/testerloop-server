import {
    TestExecution,
    TestRun,
    TestStatus,
    RunStatus,
    WorkerStatus,
    Executor,
    Prisma,
    Worker,
} from '@prisma/client';

import { S3Config, InputMaybe } from '../resolvers/types/generated';
import { Auth } from '../context.js';
import PrismaDB from '../db.js';
import { OrganisationWithoutSlug } from '../interfaces/prisma.js';

type GetBucketAndPathArgs = Auth | InputMaybe<S3Config> | undefined;

class PrismaRepository {
    private db: PrismaDB = new PrismaDB();

    __construct() {
        console.log('Starting PrismaRepository');
    }

    private validateArgs(args: GetBucketAndPathArgs): Auth {
        const auth = args as Auth;

        if (!auth || !auth.organisation) {
            throw new Error('Invalid API key.');
        }

        return auth;
    }

    async getOrganisationFromApiKey(key: string) {
        return this.db.getOrganisationFromApiKey(key);
    }

    async createApiKey(organisationId: string, name?: string | null) {
        return this.db.createApiKey(organisationId, name);
    }

    async createOrganisation(args: OrganisationWithoutSlug) {
        return this.db.createWithSlug(args);
    }

    getBucketAndPath(args: GetBucketAndPathArgs) {
        console.log('Using APIKey and DB');
        const auth = this.validateArgs(args);

        const { s3CustomPath, s3BucketName } = auth.organisation;

        return {
            customerPath: s3CustomPath,
            s3BucketName: s3BucketName,
        };
    }

    getOrganisationIdentifier(args: GetBucketAndPathArgs) {
        const auth = this.validateArgs(args);

        return auth.organisation.slug;
    }

    async getTestExecutionByGroupIdAndRunId(
        testExecutionGroupId: string,
        runID: string,
    ) {
        return this.db.prisma.testExecution.findFirst({
            where: {
                testExecutionGroupId,
                testRunId: runID,
            },
        });
    }

    async createTestExecution(
        args: TestExecution,
        testName: string,
        featureFile: string,
    ) {
        const { testExecutionGroupId, testRunId } = args;

        const testExecutionGroup =
            await this.db.prisma.testExecutionGroup.findUnique({
                where: { id: testExecutionGroupId },
            });

        if (!testExecutionGroup) {
            await this.db.prisma.testExecutionGroup.create({
                data: { id: testExecutionGroupId, testName, featureFile },
            });
        }

        const rerunOf = await this.getTestExecutionByGroupIdAndRunId(
            testExecutionGroupId,
            testRunId,
        );

        if (rerunOf) {
            args.rerunOfId = rerunOf.id;
        }

        return this.db.prisma.testExecution.create({ data: args });
    }

    async createTestRun(args: TestRun) {
        return this.db.prisma.testRun.create({ data: args });
    }

    async getRerunOf(id: string): Promise<TestExecution | null> {
        const execution = await this.db.prisma.testExecution.findUnique({
            where: { id },
            include: {
                testRun: true,
                rerunOf: true,
            },
        });
        if (!execution) {
            throw new Error('Test Execution not found.');
        }
        return execution.rerunOf ?? null;
    }

    async getTestExecutionById(id: string): Promise<TestExecution> {
        const testExecution = await this.db.prisma.testExecution.findUnique({
            where: { id },
        });
        if (!testExecution) {
            throw new Error('Test Execution not found.');
        }
        return testExecution;
    }

    async getRerunsByTestId(testExecutionId: string) {
        const reruns = await this.db.prisma.testExecution.findMany({
            where: {
                rerunOfId: testExecutionId,
            },
        });
        return reruns;
    }

    async updateTestExecutionResult(
        id: string,
        result: TestStatus,
        until: Date,
    ): Promise<TestExecution | null> {
        return this.db.prisma.testExecution.update({
            where: { id },
            data: { result, until },
        });
    }

    async updateTestRunStatus(
        id: string,
        status: RunStatus,
    ): Promise<TestRun | null> {
        const updateData: Partial<Prisma.TestRunCreateInput> = { status };
        if (status === RunStatus.COMPLETED) {
            updateData.completedAt = new Date();
        }

        return this.db.prisma.testRun.update({
            where: { id },
            data: updateData,
        });
    }

    async getTestRun(runId: string) {
        return this.db.getTestRun(runId);
    }

    async createWorker(runId: string, executor: Executor) {
        return this.db.prisma.worker.create({
            data: {
                status: WorkerStatus.PENDING,
                executor,
                testRunId: runId,
            },
        });
    }

    async getWorker(workerId: string) {
        const worker = await this.db.prisma.worker.findUnique({
            where: { id: workerId },
        });
        if (!worker) throw new Error('Worker not found.');
        return worker;
    }

    async updateWorkerStatus(
        workerId: string,
        status: WorkerStatus,
    ): Promise<Worker> {
        const isStatusStarted = status === WorkerStatus.STARTED;
        const isStatusCompleted = status === WorkerStatus.COMPLETED;

        const updateData: Partial<Prisma.WorkerCreateInput> = {
            status,
            ...(isStatusStarted && { startedAt: new Date() }),
            ...(isStatusCompleted && { completedAt: new Date() }),
        };

        return await this.db.prisma.worker.update({
            where: { id: workerId },
            data: updateData,
        });
    }

    async getWorkersByRunId(runId: string) {
        return this.db.prisma.worker.findMany({
            where: { testRunId: runId },
        });
    }

    async getTestExecutionsbyRunId(runId: string) {
        return this.db.prisma.testExecution.findMany({
            where: { testRunId: runId },
        });
    }

    async getTestExecutionsByWorkerId(workerId: string) {
        return this.db.prisma.testExecution.findMany({
            where: { workerId },
        });
    }
}

export default new PrismaRepository();
