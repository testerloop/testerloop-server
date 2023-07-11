import { v4 as uuidv4 } from 'uuid';
import { MutationResolvers } from './types/generated';
import { UploadInfo } from './types/generated';
import db from '../db.js';

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
        let organisation;
        if (headers['api-key']) {
            const apiKey = headers['api-key'] as string;
            organisation = await db.organisation.getByApiKey(apiKey);

            if (!organisation) {
                throw new Error('Invalid API key');
            }
        }

        const customerPath =
            s3Config?.customerPath ?? organisation?.s3CustomPath;
        const s3BucketName = s3Config?.bucket ?? organisation?.s3BucketName;

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
            customerPath,
            runID
        );

        return {
            __typename: 'UploadInfo',
            url: uploadInfo.url,
            runID: runID,
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
