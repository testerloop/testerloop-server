import { WorkerStatus, Executor, Prisma, Worker } from '@prisma/client';

import PrismaRepository from './repository.js';

class WorkerRepository extends PrismaRepository {
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
        const updateData: Partial<Prisma.WorkerCreateInput> = {
            status,
            ...(status === WorkerStatus.STARTED && { startedAt: new Date() }),
            ...(status === WorkerStatus.COMPLETED && {
                completedAt: new Date(),
            }),
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
}

export default WorkerRepository;
