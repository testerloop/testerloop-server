import { HttpRequestBodyResolvers } from './types/generated.js';

const resolvers: HttpRequestBodyResolvers = {
    data: ({ data }) => (data),
    encoding: ({ encoding }) => (encoding),
    mimeType: ({ mimeType }) => (mimeType),
    size: ({ size }) => (size),
};

export default resolvers;
