import { UploadInfoResolvers } from './types/generated';

const resolvers: UploadInfoResolvers = {
    url: ({ url }) => url,
    runID: ({ runID }) => runID,
    fields: ({ fields }) => fields,
    s3RunPath: ({ s3RunPath }) => s3RunPath,
};

export default resolvers;
