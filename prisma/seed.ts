import { PrismaClient, RunStatus, TestStatus } from '@prisma/client';

if (process.env.NODE_ENV === 'production') {
    throw new Error(
        'Seed script should not be called in production environment',
    );
}

const prisma = new PrismaClient();

async function main() {
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
    console.log('Created Organisation: ', organisation);
    const testRun = await prisma.testRun.create({
        data: {
            status: RunStatus.COMPLETED,
            organisationId: organisation.id,
        },
    });
    const testRun2 = await prisma.testRun.create({
        data: {
            status: RunStatus.RUNNING,
            organisationId: organisation.id,
        },
    });

    const testExecutionGroup = await prisma.testExecutionGroup.create({
        data: {},
    });
    const testExecutionGroup2 = await prisma.testExecutionGroup.create({
        data: {},
    });
    const testExecutionGroup3 = await prisma.testExecutionGroup.create({
        data: {},
    });

    const testExecution1 = await prisma.testExecution.create({
        data: {
            name: 'Test Execution 1',
            result: TestStatus.FAILED,
            testRunId: testRun.id,
            at: new Date(new Date().getTime() - 10 * 60000),
            until: new Date(),
            testExecutionGroupId: testExecutionGroup.id,
        },
    });

    const testExecution2 = await prisma.testExecution.create({
        data: {
            name: 'Test Execution 1',
            result: TestStatus.PASSED,
            testRunId: testRun.id,
            testExecutionGroupId: testExecutionGroup.id,
            at: new Date(new Date().getTime() - 10 * 60000),
            until: new Date(),
            rerunOfId: testExecution1.id,
        },
    });
    const testExecution3 = await prisma.testExecution.create({
        data: {
            name: 'Test Execution 2',
            result: TestStatus.IN_PROGRESS,
            testRunId: testRun2.id,
            testExecutionGroupId: testExecutionGroup2.id,
        },
    });

    const testExecution4 = await prisma.testExecution.create({
        data: {
            name: 'Test Execution 3',
            result: TestStatus.IN_PROGRESS,
            testRunId: testRun2.id,
            testExecutionGroupId: testExecutionGroup3.id,
        },
    });

    console.log(
        'Created Test Executions: ',
        testExecution1,
        testExecution2,
        testExecution3,
        testExecution4,
    );
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
