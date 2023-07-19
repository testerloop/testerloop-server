import { GraphQLScalarType } from 'graphql';

const cursor = new GraphQLScalarType({
    name: 'Cursor',
    serialize(value) {
        if (typeof value !== 'string') {
            throw new Error('Failed to serialize Cursor.');
        }
        return value;
    },
    parseValue(value) {
        if (typeof value !== 'string') {
            throw new Error('Failed to parse Cursor.');
        }
        return value;
    },
});

export default cursor;
