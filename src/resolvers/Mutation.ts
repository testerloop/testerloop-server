import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import { TestStatus as PrismaTestStatus, ApiPermissions } from '@prisma/client';

import {
    MutationResolvers,
    UploadInfo,
    CreateTestExecutionResponse,
    TestStatus,
    RunStatus,
    TestExecutionStatus,
} from './types/generated.js';

const resolvers: MutationResolvers = {
    createTestRun: async (
        _,
        { runEnvironmentDetails },
        { dataSources, auth, repository },
    ): Promise<UploadInfo> => {
        if (!auth?.permissions.includes(ApiPermissions.CREATE_TEST_RUN)) {
            throw new Error(
                'You do not have permission to perform this action.',
            );
        }
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
    createTestExecution: async (
        _,
        { runID, testName, featureFile },
        { dataSources, auth, repository },
    ): Promise<CreateTestExecutionResponse> => {
        if (!auth?.permissions.includes(ApiPermissions.CREATE_TEST_EXECUTION)) {
            throw new Error(
                'You do not have permission to perform this action.',
            );
        }
        const organisationIdentifier =
            repository.getOrganisationIdentifier(auth);

        const { s3BucketName, customerPath } =
            repository.getBucketAndPath(auth);

        if (!organisationIdentifier) {
            throw new Error(
                'Failed to verify organisation details. Please provide API key or s3Config',
            );
        }

        const NAMESPACE = 'c9412f45-51ba-4b4d-9867-6117fb1646e1';
        const name = `${testName}-${featureFile}-${organisationIdentifier}`;
        const testExecutionGroupId = uuidv5(name, NAMESPACE);
        const testExecutionId = uuidv4();
        await dataSources.createTestExecution.createFolder(
            s3BucketName,
            customerPath,
            runID,
            testExecutionId,
        );

        const testExecution = {
            id: testExecutionId,
            name: testName,
            result: TestStatus.InProgress,
            at: new Date(),
            until: null,
            testExecutionGroupId,
            testRunId: runID,
            rerunOfId: null,
        };

        await repository.createTestExecution(testExecution);
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
        const updatedTestStatus =
            testStatus === TestStatus.Passed
                ? PrismaTestStatus.PASSED
                : PrismaTestStatus.FAILED;
        const until = new Date();
        repository.updateTestExecutionResult(
            testExecutionId,
            updatedTestStatus,
            until,
        );
        return {
            __typename: 'TestExecutionStatus',
            id: testExecutionId,
            testName: testExecution?.name || '',
            testStatus,
        };
    },
};

export default resolvers;
