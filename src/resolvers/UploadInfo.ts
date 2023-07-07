import { UploadInfoResolvers } from './types/generated';

const resolvers: UploadInfoResolvers = {
    url: ({ url }) => url,
    runID: ({ runID }) => runID,
    fields: ({ fields }) => fields,
};

export default resolvers;
