import { DateTimeScalar } from 'graphql-date-scalars';
import { edgeResolvers } from '../util/connection.js';
import { Resolvers } from './types/generated.js';
import Cursor from './scalars/Cursor.js';
import CommandChain from './CommandChain.js';
import CommandChainConnection from './CommandChainConnection.js';
import CommandEventConnection from './CommandEventConnection.js';
import ConsoleLogEvent from './ConsoleLogEvent.js';
import GenericCommandEvent from './GenericCommandEvent.js';
import Query from './Query.js';
import PageInfo from './PageInfo.js';
import StepEvent from './StepEvent.js';
import TestExecution from './TestExecution.js';
import TestExecutionEventConnection from './TestExecutionEventConnection.js';

const interfaceResolvers = {
    __resolveType<T extends String>(parent: { __typename: T }): T {
        return parent.__typename;
    }
}

const resolvers: Resolvers = {
    CommandChain,
    CommandChainConnection,
    CommandChainEdge: edgeResolvers,
    CommandEvent: interfaceResolvers,
    CommandEventConnection,
    CommandEventEdge: edgeResolvers,
    ConsoleEvent: interfaceResolvers,
    ConsoleLogEvent,
    Cursor,
    DateTime: DateTimeScalar,
    Event: interfaceResolvers,
    GenericCommandEvent,
    InstantaneousEvent: interfaceResolvers,
    IntervalEvent: interfaceResolvers,
    Node: interfaceResolvers,
    TestExecution,
    TestExecutionEvent: interfaceResolvers,
    TestExecutionEventConnection,
    TestExecutionEventEdge: edgeResolvers,
    PageInfo,
    Query,
    StepEvent,
}

export default resolvers;
