import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import { MutationResolvers } from './types/generated';
import { UploadInfo, TestExecutionCreationResponse, UserAuthenticationResponse } from './types/generated';
import authenticateUserService from '../AuthenticateUserService.js';

const resolvers: MutationResolvers = {
    createTestRun: async (
        parent,
        { runEnvironmentDetails, s3Config },
        { dataSources, auth },
        info
    ): Promise<UploadInfo> => {
        const runID = uuidv4();
        console.log('Creating run with ID: ', runID);
        let s3BucketName;
        let customerPath;
        if (!s3Config) {
            if (!auth) {
                throw new Error('Authorization required');
            }
            const organisation = auth.organisation;
            customerPath = organisation.s3CustomPath;
            s3BucketName = organisation.s3BucketName;
        } else {
            console.log('Using s3Config');
            ({ customerPath, bucket: s3BucketName } = s3Config);
        }

        if (!customerPath || !s3BucketName) {
            throw new Error(
                'Invalid configuration. Please provide s3BucketName and customerPath.'
            );
        }
        const s3RunPath = `${s3BucketName}/${customerPath}/${runID}`;

        console.log(`Uploading cicd.json file to: ${s3RunPath}/logs/`);
        await dataSources.createTestRun.uploadCICDFileToS3(
            s3BucketName,
            customerPath,
            runID,
            runEnvironmentDetails
        );
        console.log('Creating presigned POST url for upload to S3');
        const uploadInfo = await dataSources.createTestRun.getUploadLink(
            s3BucketName,
            customerPath,
            runID
        );

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
        parent,
        { testName, featureFile, s3Config },
        { auth }
    ): Promise<TestExecutionCreationResponse> => {
        let organisationIdentifier;
        if (!s3Config) {
            if (!auth) {
                throw new Error('Authorization required');
            }
            organisationIdentifier = auth.organisation.id;
        } else {
            console.log('Using s3Config');
            organisationIdentifier = s3Config.customerPath;
        }

        const NAMESPACE = 'c9412f45-51ba-4b4d-9867-6117fb1646e1';
        const name = `${testName}-${featureFile}-${organisationIdentifier}`;
        const testExecutionGroupID = uuidv5(name, NAMESPACE);
        const testExecutionID = uuidv4();
        return {
            __typename: 'TestExecutionCreationResponse',
            testExecutionId: testExecutionID,
            testExecutionGroupId: testExecutionGroupID,
        };
    },
    authenticateUser: async (
        parent,
        { accessToken },
    ): Promise<UserAuthenticationResponse> => {
        console.log(accessToken);
        const user = await authenticateUserService.createUser(accessToken);
        return {
            __typename: 'UserAuthenticationResponse',
            id: user?.id ?? '99999',
        };
    }
};

export default resolvers;
