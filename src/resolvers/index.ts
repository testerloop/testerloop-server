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
    Cookie: {
        name: ({ name }) => (name),
        value: ({ value }) => (value),
        path: ({ path }) => (path),
        domain: ({ domain }) => (domain),
        expires: ({ expires }) => (expires),
        httpOnly: ({ httpOnly }) => (httpOnly),
        secure: ({ secure }) => (secure),
    },
    HttpHeaders: {
        size: ({ size }) => (size),
        values: ({ values }) => (values),
    },
    HttpNetworkEventInitiator: {
        lineNo: ({ lineNo }) => (lineNo),
        origin: ({ origin }) => (origin),
    },
    HttpNetworkRequest: {
        body: ({ body }) => (body),
        cookies: ({ cookies }) => (cookies),
        headers: ({ headers }) => (headers),
        httpVersion: ({ httpVersion }) => (httpVersion),
        method: ({ method }) => (method),
        queryString: ({ queryString }) => (queryString),
        url: ({ url }) => (url),
    },
    HttpNetworkRequestUrl: {
        nonKeyValueQueryString: ({ nonKeyValueQueryString }) => (nonKeyValueQueryString),
        url: ({ url }) => (url),
    },
    HttpNetworkResponse: {
        body: ({ body }) => (body),
        cookies: ({ cookies }) => (cookies),
        headers: ({ headers }) => (headers),
        redirectURL: ({ redirectURL }) => (redirectURL),
        status: ({ status }) => (status),
        statusText: ({ statusText }) => (statusText),
        transferSize: ({ transferSize }) => (transferSize),
    },
    HttpNetworkTimings: {
        blocked: ({ blocked }) => (blocked),
        connect: ({ connect }) => (connect),
        queued: ({ queued }) => (queued),
        receive: ({ receive }) => (receive),
        send: ({ send }) => (send),
        ssl: ({ ssl }) => (ssl),
        wait: ({ wait }) => (wait),
    },
    HttpRequestBody: {
        data: ({ data }) => (data),
        encoding: ({ encoding }) => (encoding),
        mimeType: ({ mimeType }) => (mimeType),
        size: ({ size }) => (size),
    },
    HttpResponseBody: {
        chunks: ({ chunks }) => (chunks),
        data: ({ data }) => (data),
        encoding: ({ encoding }) => (encoding),
        mimeType: ({ mimeType }) => (mimeType),
        size: ({ size }) => (size),
    },
    HttpResponseBodyChunk: {
        at: ({ at }) => (at),
        data: ({ data }) => (data),
        size: ({ size }) => (size),
    },
    KeyValuePair: {
        key: ({ key }) => (key),
        value: ({ value }) => (value),
    },
    NetworkEventTime: {
        at: ({ at }) => (at),
        until: ({ until }) => (until),
    },
    NetworkEventTiming: {
        at: ({ at }) => (at),
        until: ({ until }) => (until),
    }
};

export default resolvers;
