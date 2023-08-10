import { TestRun, RunStatus, Prisma } from '@prisma/client';

import PrismaRepository from './repository.js';

class TestRunRepository extends PrismaRepository {
    async createTestRun(args: TestRun) {
        return this.db.prisma.testRun.create({ data: args });
    }

    async getTestRun(runId: string) {
        return this.db.getTestRun(runId);
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
