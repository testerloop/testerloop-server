import { DateTimeScalar } from 'graphql-date-scalars';
import { Resolvers } from './types/generated.js';
import Query from './Query.js'
import TestExecution from './TestExecution.js';

const interfaceResolvers = {
    __resolveType<T extends String>(parent: { __typename: T }): T {
        return parent.__typename;
    }
}

const resolvers: Resolvers = {
    DateTime: DateTimeScalar,
    Event: interfaceResolvers,
    InstantaneousEvent: {
        __resolveType: () => null,
    },
    IntervalEvent: interfaceResolvers,
    Node: interfaceResolvers,
    TestExecution,
    Query,
}

export default resolvers;
