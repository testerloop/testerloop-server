import { UploadInfoResolvers } from './types/generated';

const resolvers: UploadInfoResolvers = {
    url: ({ url }) => url,
    fields: ({ fields }) => fields,
};

export default resolvers;
