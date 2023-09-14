import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import {
    TestStatus as PrismaTestStatus,
    RunStatus as PrismaRunStatus,
    WorkerStatus as PrismaWorkerStatus,
} from '@prisma/client';

import { pubsub } from '../pubsub.js';

import {
    MutationResolvers,
    UploadInfo,
    CreateTestExecutionResponse,
    TestStatus,
    RunStatus,
    TestExecutionStatus,
    Worker,
    WorkerStatus,
    Executor,
    CreateApiKeyResponse,
    User,
} from './types/generated.js';

const isInvalidTransition = (
    currentStatus: PrismaWorkerStatus,
    targetStatus: WorkerStatus,
) => {
    return (
        targetStatus === WorkerStatus.Pending ||
        currentStatus === WorkerStatus.Completed ||
        (currentStatus === WorkerStatus.Started &&
            targetStatus === WorkerStatus.Started)
    );
};

const resolvers: MutationResolvers = {
    createTestRun: async (
        _,
        { runEnvironmentDetails },
        { dataSources, auth, repository },
    ): Promise<UploadInfo> => {
        const runID = uuidv4();
        console.log('Creating run with ID: ', runID);

        const { s3BucketName, customerPath } =
            repository.organisation.getBucketAndPath(auth);

        const s3RunPath = `${s3BucketName}/${customerPath}/${runID}`;

        console.log(`Uploading cicd.json file to: ${s3RunPath}/logs/`);
        await dataSources.createTestRun.uploadCICDFileToS3(
            s3BucketName,
            customerPath,
            runID,
            runEnvironmentDetails,
        );
        console.log('Creating presigned POST url for upload to S3');
        const uploadInfo = await dataSources.createTestRun.getUploadLink(
            s3BucketName,
            customerPath,
            runID,
        );
        if (auth) {
            console.log('Adding run to database');
            const testRun = {
                id: runID,
                status: RunStatus.Running,
                organisationId: auth.organisation.id,
                createdAt: new Date(),
                completedAt: null,
            };
            await repository.testRun.createTestRun(testRun);
        }

        return {
            __typename: 'UploadInfo',
            url: uploadInfo.url,
            runID: runID,
            s3RunPath: s3RunPath,
            fields: uploadInfo.fields
                .filter(({ key }) => key !== 'key')
                .map(({ key, value }) => ({
                    __typename: 'Field',
                    key: key,
                    value: value,
                })),
        };
    },

    createWorkers: async (
        _,
        { runID, count, executor },
        { repository },
    ): Promise<Worker[]> => {
        const workerPromises = Array(count)
            .fill(null)
            .map(() => repository.worker.createWorker(runID, executor));

        const workers = await Promise.all(workerPromises);

        return workers.map((worker) => ({
            __typename: 'Worker',
            ...worker,
            executor: executor,
            status: WorkerStatus.Pending,
            testExecutions: [],
        }));
    },

    setWorkerStatus: async (
        _,
        { workerID, status },
        { repository },
    ): Promise<Worker> => {
        const worker = await repository.worker.getWorker(workerID);

        if (isInvalidTransition(worker.status, status)) {
            throw new Error('Invalid status transition.');
        }

        status === WorkerStatus.Completed &&
            (await repository.testExecution.deleteInProgressTestExecutionsByWorkerId(
                workerID,
            ));

        const updatedWorker = await repository.worker.updateWorkerStatus(
            workerID,
            status,
        );

        return {
            __typename: 'Worker',
            ...updatedWorker,
            executor: updatedWorker.executor as Executor,
            status: updatedWorker.status as WorkerStatus,
            testExecutions: [],
        };
    },

    createTestExecution: async (
        _,
        { runID, testName, featureFile, workerId },
        { auth, repository },
    ): Promise<CreateTestExecutionResponse> => {
        if (!auth) {
            throw new Error('Failed to verify organisation details.');
        }
        const organisationIdentifier =
            repository.organisation.getOrganisationIdentifier(auth);

        if (!organisationIdentifier) {
            throw new Error(
                'Failed to verify organisation details. Please provide API key or s3Config',
            );
        }

        const NAMESPACE = 'c9412f45-51ba-4b4d-9867-6117fb1646e1';
        const name = `${testName}-${featureFile}-${organisationIdentifier}`;
        const testExecutionGroupId = uuidv5(name, NAMESPACE);
        const testExecutionId = uuidv4();

        const testExecution = {
            id: testExecutionId,
            testName: testName,
            featureFile: featureFile,
            result: TestStatus.InProgress,
            at: new Date(),
            until: null,
            testExecutionGroupId,
            testRunId: runID,
            rerunOfId: null,
            workerId: workerId,
        };

        await repository.testExecution.createTestExecution(
            testExecution,
            testName,
            featureFile,
        );

        return {
            __typename: 'CreateTestExecutionResponse',
            testExecutionId,
            testExecutionGroupId,
        };
    },

    setTestExecutionStatus: async (
        _,
        { testExecutionId, testStatus },
        { repository },
    ): Promise<TestExecutionStatus> => {
        const testExecution =
            await repository.testExecution.getTestExecutionById(
                testExecutionId,
            );

        const updatedTestStatus =
            testStatus === TestStatus.Passed
                ? PrismaTestStatus.PASSED
                : PrismaTestStatus.FAILED;

        const until = new Date();
        await repository.testExecution.updateTestExecutionResult(
            testExecutionId,
            updatedTestStatus,
            until,
        );

        const { testName, featureFile, rerunOfId } = testExecution;

        const result = {
            __typename: 'TestExecutionStatus' as const,
            id: testExecutionId,
            testName,
            featureFile,
            rerunOfId,
            testStatus,
        };

        pubsub.publish('TEST_EXECUTION_UPDATED', {
            id: testExecution.id,
            runId: testExecution.testRunId,
            at: new Date(),
        });

        return result;
    },

    refreshRunStatus: async (
        _,
        { runId },
        { repository },
    ): Promise<RunStatus> => {
        const run = await repository.testRun.getTestRunWithExecutions(runId);

        const workers = await repository.worker.getWorkersByRunId(runId);
        const allWorkersCompleted = workers.every(
            (worker) => worker.status === PrismaWorkerStatus.COMPLETED,
        );

        if (!allWorkersCompleted) {
            return run.status as RunStatus;
        }

        const updatedRun = await repository.testRun.updateTestRunStatus(
            runId,
            PrismaRunStatus.COMPLETED,
        );

        if (!updatedRun) {
            console.error(
                'Failed to update run status. Returning initial status.',
            );
            return run.status as RunStatus;
        }

        return updatedRun.status as RunStatus;
    },

    createApiKey: async (
        _,
        { organisationId, name },
        { repository },
    ): Promise<CreateApiKeyResponse> => {
        const apiKey = await repository.apiKey.createApiKey(
            organisationId,
            name,
        );
        return {
            __typename: 'CreateApiKeyResponse',
            apiKey,
        };
    },

    registerClient: async (_, { userInput }, { repository }): Promise<User> => {
        const organisationName = `${userInput.firstName}'s organisation`;

        const organisation = await repository.organisation.createOrganisation({
            name: organisationName,
        });

        await repository.apiKey.createApiKey(
            organisation.id,
            organisation.name,
            userInput.email,
        );

        const newUser = await repository.user.createUser({
            email: userInput.email,
            cognitoId: userInput.cognitoId,
            userOrganisations: {
                create: {
                    organisationId: organisation.id,
                    role: 'ADMIN',
                },
            },
        });

        const { id, email, cognitoId } = newUser;

        return {
            __typename: 'User',
            id,
            email,
            cognitoId,
        };
    },
};

export default resolvers;
