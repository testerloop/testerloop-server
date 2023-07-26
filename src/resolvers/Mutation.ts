import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

import {
    MutationResolvers,
    UploadInfo,
    TestExecutionCreationResponse,
    TestStatus,
    RunStatus,
} from './types/generated.js';

const resolvers: MutationResolvers = {
    createTestRun: async (
        _,
        { runEnvironmentDetails, s3Config },
        { dataSources, auth, repository },
    ): Promise<UploadInfo> => {
        const runID = uuidv4();
        console.log('Creating run with ID: ', runID);

        const { s3BucketName, customerPath } = repository.getBucketAndPath(
            auth || s3Config,
        );

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
            await dataSources.createTestRun.addTestRunToDatabase(testRun);
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
        { runID, testName, featureFile, s3Config },
        { dataSources, auth, repository },
    ): Promise<TestExecutionCreationResponse> => {
        const organisationIdentifier = repository.getOrganisationIdentifier(
            auth || s3Config || undefined,
        );

        const { s3BucketName, customerPath } = repository.getBucketAndPath(
            auth || s3Config,
        );

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

        await dataSources.createTestExecution.findOrCreateTestExecutionGroup(
            testExecutionGroupId,
        );

        const rerunOf =
            await dataSources.createTestExecution.findTestExecutionGroupInRun(
                testExecutionGroupId,
                runID,
            );

        const testExecution = {
            id: testExecutionId,
            name: testName,
            result: TestStatus.InProgress,
            at: new Date(),
            until: null,
            testExecutionGroupId,
            testRunId: runID,
            rerunOfId: rerunOf?.id || null,
        };

        await dataSources.createTestExecution.updateDatabase(testExecution);
        return {
            __typename: 'TestExecutionCreationResponse',
            testExecutionId,
            testExecutionGroupId,
        };
    },
};

export default resolvers;
