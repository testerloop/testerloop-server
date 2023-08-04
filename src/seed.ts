/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    PrismaClient,
    RunStatus,
    TestStatus,
    WorkerStatus,
    Executor,
} from '@prisma/client';

import apiKeyService from './ApiKeyService.js';

if (process.env.NODE_ENV === 'production') {
    throw new Error(
        'Seed script should not be called in production environment',
    );
}

const testApiKey = process.env.TEST_API_KEY as string;
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            email: 'testuser@example.com',
        },
    });

    const hashedKey = await apiKeyService.hashKey(testApiKey);
    const organisation = await prisma.organisation.create({
        data: {
            name: 'Testerloop',
            slug: 'testerloop',
            s3CustomPath: 'custom',
            s3BucketName: 'otf-lambda-results',
            s3Region: 'eu-west-3',
            apiKeys: {
                create: {
                    hashedKey,
                    name: 'test',
                    prefix: 'testApiKey',
                },
            },
        },
    });

    const userOrganisation = await prisma.userOrganisation.create({
        data: {
            userId: user.id,
            organisationId: organisation.id,
        },
    });

    const testRun = await prisma.testRun.create({
        data: {
            status: RunStatus.COMPLETED,
            createdAt: new Date(),
            completedAt: new Date(),
            organisationId: organisation.id,
        },
    });

    const testRun2 = await prisma.testRun.create({
        data: {
            status: RunStatus.RUNNING,
            createdAt: new Date(),
            organisationId: organisation.id,
        },
    });

    const testExecutionGroup = await prisma.testExecutionGroup.create({
        data: {
            testName: 'Test Name 1',
            featureFile: 'Feature File 1',
        },
    });

    const worker1 = await prisma.worker.create({
        data: {
            status: WorkerStatus.COMPLETED,
            executor: Executor.LOCAL,
            createdAt: new Date(),
            startedAt: new Date(),
            completedAt: new Date(),
            testRunId: testRun.id,
        },
    });

    const testExecution1 = await prisma.testExecution.create({
        data: {
            testName: 'Test Execution 1',
            result: TestStatus.PASSED,
            featureFile: 'Feature File 1',
            testRunId: testRun.id,
            testExecutionGroupId: testExecutionGroup.id,
            at: new Date(new Date().getTime() - 10 * 60000),
            until: new Date(),
            workerId: worker1.id,
        },
    });

    const worker2 = await prisma.worker.create({
        data: {
            status: WorkerStatus.STARTED,
            executor: Executor.LOCAL,
            createdAt: new Date(),
            startedAt: new Date(),
            testRunId: testRun2.id,
        },
    });

    const testExecution2 = await prisma.testExecution.create({
        data: {
            testName: 'Test Execution 2',
            featureFile: 'Feature File 2',
            result: TestStatus.IN_PROGRESS,
            testRunId: testRun2.id,
            testExecutionGroupId: testExecutionGroup.id,
            at: new Date(new Date().getTime() - 10 * 60000),
            until: new Date(),
            workerId: worker2.id,
        },
    });

    const testExecution3 = await prisma.testExecution.create({
        data: {
            testName: 'Test Execution 3',
            featureFile: 'Feature File 3',
            result: TestStatus.IN_PROGRESS,
            testRunId: testRun2.id,
            testExecutionGroupId: testExecutionGroup.id,
            at: new Date(new Date().getTime() - 10 * 60000),
            until: new Date(),
            workerId: worker2.id,
        },
    });

    console.log('Data seeded successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
