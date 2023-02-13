import { DateTimeScalar } from 'graphql-date-scalars';
import { edgeResolvers } from '../util/connection.js';
import { Resolvers } from './types/generated.js';
import Cursor from './scalars/Cursor.js';
import ConsoleLogEvent from './ConsoleLogEvent.js';
import Query from './Query.js';
import PageInfo from './PageInfo.js';
import TestExecution from './TestExecution.js';
import TestExecutionEventConnection from './TestExecutionEventConnection.js';

const interfaceResolvers = {
    __resolveType<T extends String>(parent: { __typename: T }): T {
        return parent.__typename;
    }
}

const resolvers: Resolvers = {
    ConsoleEvent: interfaceResolvers,
    ConsoleLogEvent,
    Cursor,
    DateTime: DateTimeScalar,
    Event: interfaceResolvers,
    InstantaneousEvent: interfaceResolvers,
    IntervalEvent: interfaceResolvers,
    Node: interfaceResolvers,
    TestExecution,
    TestExecutionEvent: interfaceResolvers,
    TestExecutionEventConnection,
    TestExecutionEventEdge: edgeResolvers,
    PageInfo,
    Query,
}

export default resolvers;
