import { v4 as uuidv4 } from 'uuid';
import { MutationResolvers } from './types/generated';
import { UploadInfo } from './types/generated';

const resolvers: MutationResolvers = {
    createRun: async (
        parent,
        { customerPath },
        { dataSources },
        info
    ): Promise<UploadInfo> => {
        const runID = uuidv4();
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
