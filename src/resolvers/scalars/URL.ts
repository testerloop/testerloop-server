import { GraphQLScalarType } from 'graphql';

const URL = new GraphQLScalarType({
    name: 'URL',
    serialize(value) {
        if (typeof value !== 'string') {
            throw new Error('Failed to serialize URL.');
        }
        return value;
    },
    parseValue(value) {
        if (typeof value !== 'string') {
            throw new Error('Failed to parse URL.');
        }
        return value;
    },
});

export default URL;
