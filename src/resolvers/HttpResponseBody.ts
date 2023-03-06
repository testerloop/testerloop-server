import { HttpResponseBodyResolvers } from './types/generated.js';

const resolvers: HttpResponseBodyResolvers  = {
    chunks: ({ chunks }) => (chunks),
    data: ({ data }) => (data),
    encoding: ({ encoding }) => (encoding),
    mimeType: ({ mimeType }) => (mimeType),
    size: ({ size }) => (size),
};

export default resolvers;
