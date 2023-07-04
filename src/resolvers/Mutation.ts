import { MutationResolvers } from './types/generated';
import { UploadInfo } from './types/generated';

const resolvers: MutationResolvers = {
    createRun: async (
        parent,
        { customerPath, runID },
        { dataSources },
        info
    ): Promise<UploadInfo> => {
        const uploadInfo = await dataSources.createRun.createRun(
            customerPath,
            runID
        );

        return {
            __typename: 'UploadInfo',
            url: uploadInfo.url,
            fields: uploadInfo.fields.map((field) => ({
                __typename: 'Field',
                key: field.key,
                value: field.value,
            })),
        };
    },
};

export default resolvers;
