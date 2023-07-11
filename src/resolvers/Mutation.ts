import { v4 as uuidv4 } from 'uuid';
import { MutationResolvers } from './types/generated';
import { UploadInfo } from './types/generated';
import db from '../db.js';

async function handleApiKey(apiKey: string) {
    const apiKeyRecord = await db.organisation.getByApiKey(apiKey);

    if (!apiKeyRecord) {
        throw new Error('Invalid API key');
    }

    if (!apiKeyRecord.isEnabled) {
        throw new Error(
            'Your API key is not enabled. Please renew your subscription or contact Testerloop support.'
        );
    }

    return apiKeyRecord.organisation;
}

const resolvers: MutationResolvers = {
    createRun: async (
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
        let apiKeyRecord;
        let s3BucketName;
        let customerPath;
        if (headers['api-key'] && !s3Config) {
            const apiKey = headers['api-key'] as string;
            apiKeyRecord = await db.organisation.getByApiKey(apiKey);

            if (!apiKeyRecord) {
                throw new Error('Invalid API key');
            }

            if (!apiKeyRecord.isEnabled) {
                throw new Error(
                    'Your API key is not enabled. Please renew your subscription or contact Testerloop support.'
                );
            }
            const organisation = apiKeyRecord?.organisation;
            customerPath = organisation?.s3CustomPath;
            s3BucketName = organisation?.s3BucketName;
        } else {
            customerPath = s3Config?.customerPath;
            s3BucketName = s3Config?.bucket;
        }

        if (!customerPath || !s3BucketName) {
            throw new Error(
                'Invalid configuration. Please provide s3BucketName and customerPath.'
            );
        }

        await dataSources.createRun.uploadCICDFileToS3(
            s3BucketName,
            customerPath,
            runID,
            runEnvironmentDetails
        );

        const uploadInfo = await dataSources.createRun.getUploadLink(
            s3BucketName,
            customerPath,
            runID
        );

        return {
            __typename: 'UploadInfo',
            url: uploadInfo.url,
            runID: runID,
            s3RunPath: `${s3BucketName}/${customerPath}/${runID}`,
            fields: uploadInfo.fields
                .filter((field) => field.key !== 'key')
                .map((field) => ({
                    __typename: 'Field',
                    key: field.key,
                    value: field.value,
                })),
        };
    },
};

export default resolvers;
