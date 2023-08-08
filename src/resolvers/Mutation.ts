import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import {
    TestStatus as PrismaTestStatus,
    RunStatus as PrismaRunStatus,
    WorkerStatus as PrismaWorkerStatus,
} from '@prisma/client';

import repository from '../repository/repository.js';

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
} from './types/generated.js';

const resolvers: MutationResolvers = {
    createTestRun: async (
        _,
        { runEnvironmentDetails },
        { dataSources, auth, repository },
    ): Promise<UploadInfo> => {
        const runID = uuidv4();
        console.log('Creating run with ID: ', runID);

        const { s3BucketName, customerPath } =
            repository.getBucketAndPath(auth);

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
            await repository.createTestRun(testRun);
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
            .map(() => repository.createWorker(runID, executor));

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
        const worker = await repository.getWorker(workerID);
        if (!worker) throw new Error('Worker not found.');

        const isInputPending = status === WorkerStatus.Pending;
        const isAlreadyCompleted = worker.status === WorkerStatus.Completed;
        const isStartedAgain =
            worker.status === WorkerStatus.Started &&
            status === WorkerStatus.Started;

        if (isInputPending || isAlreadyCompleted || isStartedAgain) {
            throw new Error('Invalid status transition.');
        }

        const updatedWorker = await repository.updateWorkerStatus(
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
            repository.getOrganisationIdentifier(auth);

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

        await repository.createTestExecution(
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
        const testExecution = await repository.getTestExecutionById(
            testExecutionId,
        );
        if (!testExecution) {
            throw new Error('Test Execution not found.');
        }

        const updatedTestStatus =
            testStatus === TestStatus.Passed
                ? PrismaTestStatus.PASSED
                : PrismaTestStatus.FAILED;

        const until = new Date();
        await repository.updateTestExecutionResult(
            testExecutionId,
            updatedTestStatus,
            until,
        );

        const { testName, featureFile, rerunOfId } = testExecution;
        return {
            __typename: 'TestExecutionStatus',
            id: testExecutionId,
            testName,
            featureFile,
            rerunOfId,
            testStatus,
        };
    },

    refreshRunStatus: async (
        _,
        { runId },
        { repository },
    ): Promise<RunStatus> => {
        const run = await repository.getTestRun(runId);
        if (!run) {
            throw new Error('Run not found.');
        }

        const workers = await repository.getWorkersByRunId(runId);
        const allWorkersCompleted = workers.every(
            (worker) => worker.status === PrismaWorkerStatus.COMPLETED,
        );

        if (!allWorkersCompleted) {
            return run.status as RunStatus;
        }

        const updatedRun = await repository.updateTestRunStatus(
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
    ): Promise<CreateApiKeyResponse> => {
        const apiKey = await repository.createApiKey(organisationId, name);
        return {
            __typename: 'CreateApiKeyResponse',
            apiKey,
        };
    },
};

export default resolvers;
