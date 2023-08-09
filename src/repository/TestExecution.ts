import { TestExecution, TestStatus } from '@prisma/client';

import PrismaRepository from './repository.js';

class TestExecutionRepository extends PrismaRepository {
    async getTestExecutionById(id: string): Promise<TestExecution> {
        const testExecution = await this.db.prisma.testExecution.findUnique({
            where: { id },
        });
        if (!testExecution) {
            throw new Error('Test Execution not found.');
        }
        return testExecution;
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

    async getTestExecutionRerunOf(id: string): Promise<TestExecution | null> {
        const testExecution = await this.db.prisma.testExecution.findUnique({
            where: { id },
            include: {
                testRun: true,
                rerunOf: true,
            },
        });
        if (!testExecution) {
            throw new Error('Test Execution not found.');
        }
        return testExecution.rerunOf ?? null;
    }

    async getRerunsByTestExecutionId(testExecutionId: string) {
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

    async deleteInProgressTestExecutionsByWorkerId(workerId: string) {
        return this.db.prisma.testExecution.deleteMany({
            where: {
                workerId,
                result: { equals: TestStatus.IN_PROGRESS },
            },
        });
    }
}

export default TestExecutionRepository;
