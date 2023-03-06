import { HttpResponseBodyChunkResolvers } from './types/generated.js';

const resolvers: HttpResponseBodyChunkResolvers = {
    at: ({ at }) => (at),
    data: ({ data }) => (data),
    size: ({ size }) => (size),
};

export default resolvers;
