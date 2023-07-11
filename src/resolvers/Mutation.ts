import { v4 as uuidv4 } from 'uuid';
import { MutationResolvers } from './types/generated';
import { UploadInfo } from './types/generated';
import handleApiKey from '../util/handleApiKey.js';

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
        let s3BucketName;
        let customerPath;
        if (headers['api-key'] && !s3Config) {
            const apiKey = headers['api-key'] as string;
            const organisation = await handleApiKey(apiKey);
            customerPath = organisation?.s3CustomPath;
            s3BucketName = organisation?.s3BucketName;
        } else {
            ({ customerPath, bucket: s3BucketName } = s3Config || {});
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
