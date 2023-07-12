import { FieldResolvers } from './types/generated';

const resolvers: FieldResolvers = {
    key: ({ key }) => key,
    value: ({ value }) => value,
};

export default resolvers;
