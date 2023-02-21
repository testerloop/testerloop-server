import { DateTimeScalar } from 'graphql-date-scalars';
import { edgeResolvers } from '../util/connection.js';
import { Resolvers } from './types/generated.js';
import Cursor from './scalars/Cursor.js';
import ConsoleLogEvent from './ConsoleLogEvent.js';
import Query from './Query.js';
import PageInfo from './PageInfo.js';
import TestExecution from './TestExecution.js';
import TestExecutionEventConnection from './TestExecutionEventConnection.js';
import HttpNetworkEvent from './HttpNetworkEvent.js';

const interfaceResolvers = {
    __resolveType<T extends String>(parent: { __typename: T }): T {
        return parent.__typename;
    }
}

const resolvers: Omit<
    Resolvers,
    | 'Cookie'
    | 'HttpHeaders'
    | 'HttpNetworkEventInitiator'
    | 'HttpNetworkRequest'
    | 'HttpNetworkRequestUrl'
    | 'HttpNetworkResponse'
    | 'HttpNetworkTimings'
    | 'HttpRequestBody'
    | 'HttpResponseBody'
    | 'HttpResponseBodyChunk'
    | 'KeyValuePair'
    | 'NetworkEventTime'
    | 'NetworkEventTiming'
> = {
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
    NetworkEvent: interfaceResolvers,
    HttpBody: interfaceResolvers,
    HttpNetworkEvent
};

export default resolvers;
