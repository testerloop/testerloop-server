import { v4 as uuidv4 } from 'uuid';
import { MutationResolvers } from './types/generated';
import { UploadInfo } from './types/generated';
import handleApiKey from '../util/handleApiKey.js';

const resolvers: MutationResolvers = {
    createTestRun: async (
        parent,
        { runEnvironmentDetails, s3Config },
        {
            dataSources,
            request: {
                req: { headers },
            },
        },
        info
    ): Promise<UploadInfo> => {
        const runID = uuidv4();
        console.log('Creating run with ID: ', runID);
        let s3BucketName;
        let customerPath;
        if (headers['api-key'] && !s3Config) {
            console.log('API Key found');
            const apiKey = headers['api-key'] as string;
            const organisation = await handleApiKey(apiKey);
            console.log('Valid API key found for: ', organisation.name);
            customerPath = organisation?.s3CustomPath;
            s3BucketName = organisation?.s3BucketName;
        } else {
            console.log('No API key found, attempting to use s3Config');
            ({ customerPath, bucket: s3BucketName } = s3Config || {});
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
};

export default resolvers;
