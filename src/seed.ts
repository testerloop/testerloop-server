import {
    PrismaClient,
    RunStatus,
    TestStatus,
    WorkerStatus,
    Executor,
} from '@prisma/client';

if (process.env.NODE_ENV === 'production') {
    throw new Error(
        'Seed script should not be called in production environment',
    );
}

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            email: 'testuser@example.com',
        },
    });

    const organisation = await prisma.organisation.create({
        data: {
            name: 'Testerloop',
            slug: 'testerloop',
            s3CustomPath: 'custom',
            s3BucketName: 'otf-lambda-results',
            s3Region: 'eu-west-3',
            apiKeys: {
                create: {
                    apiKey: 'testApiKey',
                    isEnabled: true,
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

    console.log('Created Users: ', user);
    console.log('Created Organisations: ', organisation);
    console.log('Created UserOrganisations: ', userOrganisation);
    console.log('Created TestRuns: ', testRun, testRun2);
    console.log('Created TestExecutionGroups: ', testExecutionGroup);
    console.log('Created Workers: ', worker1, worker2);
    console.log('Created TestExecutions: ', testExecution1, testExecution2);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
