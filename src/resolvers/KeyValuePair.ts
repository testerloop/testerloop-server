import { KeyValuePairResolvers } from './types/generated.js';

const resolvers: KeyValuePairResolvers = {
    key: ({ key }) => (key),
    value: ({ value }) => (value),
};

export default resolvers;
