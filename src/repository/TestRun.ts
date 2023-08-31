import { TestRun, RunStatus, Prisma } from '@prisma/client';

import PrismaRepository from './repository.js';

class TestRunRepository extends PrismaRepository {
    async createTestRun(args: TestRun) {
        return this.db.prisma.testRun.create({ data: args });
    }

    async getTestRun(id: string) {
        const testRun = await this.db.prisma.testRun.findUnique({
            where: { id },
        });
        if (!testRun) throw new Error('Run not found.');
        return testRun;
    }

    async getTestRunWithExecutions(id: string) {
        const testRun = await this.db.prisma.testRun.findUnique({
            where: { id },
            include: { testExecutions: true },
        });
        if (!testRun) throw new Error('Run not found.');
        return testRun;
    }

    async getRunsByOrganisationId(organisationId: string) {
        return this.db.prisma.testRun.findMany({
            where: { organisationId },
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
}

export default TestRunRepository;
