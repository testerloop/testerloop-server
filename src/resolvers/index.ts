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
import Cookie from './Cookie.js';
import HttpHeaders from './HttpHeaders.js';
import HttpNetworkEventInitiator from './HttpNetworkEventInitiator.js';
import HttpNetworkRequest from './HttpNetworkRequest.js';
import HttpNetworkRequestUrl from './HttpNetworkRequestUrl.js';
import HttpNetworkResponse from './HttpNetworkResponse.js';
import HttpNetworkTimings from './HttpNetworkTimings.js';
import HttpRequestBody from './HttpRequestBody.js';
import HttpResponseBody from './HttpResponseBody.js';
import HttpResponseBodyChunk from './HttpResponseBodyChunk.js';
import KeyValuePair from './KeyValuePair.js';
import NetworkEventTime from './NetworkEventTime.js';
import NetworkEventTiming from './NetworkEventTiming.js';

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
    NetworkEvent: interfaceResolvers,
    HttpBody: interfaceResolvers,
    HttpNetworkEvent,
    Cookie,
    HttpHeaders,
    HttpNetworkEventInitiator,
    HttpNetworkRequest,
    HttpNetworkRequestUrl,
    HttpNetworkResponse,
    HttpNetworkTimings,
    HttpRequestBody,
    HttpResponseBody,
    HttpResponseBodyChunk,
    KeyValuePair,
    NetworkEventTime,
    NetworkEventTiming,
};

export default resolvers;
