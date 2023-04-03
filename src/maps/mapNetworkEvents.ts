import { z } from 'zod';

const KeyValuePairSchema = z.object({
    __typename: z.literal('KeyValuePair'),
    key: z.string(),
    value: z.string(),
  });

const CookieSchema = z.object({
    __typename: z.literal('Cookie'),
    name: z.string(),
    value: z.string(),
    domain: z.nullable(z.string()),
    path: z.nullable(z.string()),
    secure: z.boolean(),
    httpOnly: z.boolean(),
    expires: z.nullable(z.string()),
});

const HttpHeadersSchema = z.object({
    __typename: z.literal('HttpHeaders'),
    size: z.number(),
    values: z.array(KeyValuePairSchema),
});

const HttpNetworkRequestUrlSchema = z.object({
    __typename: z.literal('HttpNetworkRequestUrl'),
    url: z.string(),
    nonKeyValueQueryString: z.nullable(z.string()),
  });

const HttpNetworkRequestBodySchema = z.object({
    __typename: z.literal('HttpRequestBody'),
    size: z.number(),
    mimeType: z.string(),
    data: z.string(),
    encoding: z.nullable(z.string()),
});

const HttpNetworkRequestSchema = z.object({
    __typename: z.literal('HttpNetworkRequest'),
    method: z.string(),
    url: HttpNetworkRequestUrlSchema,
    queryString: z.array(KeyValuePairSchema),
    cookies: z.array(CookieSchema),
    headers: HttpHeadersSchema,
    httpVersion: z.string(),
    body: HttpNetworkRequestBodySchema.nullable(),
  });

const HttpResponseBodyChunk = z.object({
    __typename: z.literal('HttpResponseBodyChunk'),
    at: z.date(),
    size: z.number(),
    data: z.string()
})

const HttpNetworkResponseBodySchema = z.object({
    __typename: z.literal('HttpResponseBody'),
    size: z.number(),
    mimeType: z.string(),
    data: z.string(),
    encoding: z.nullable(z.string()),
    chunks: z.array(HttpResponseBodyChunk),
});

const HttpNetworkResponseSchema = z.object({
    __typename: z.literal('HttpNetworkResponse'),
    redirectURL: z.string(),
    status: z.number(),
    statusText: z.string(),
    body: HttpNetworkResponseBodySchema,
    cookies: z.array(CookieSchema),
    headers: HttpHeadersSchema,
    httpVersion: z.string(),
    transferSize: z.number(),
    chunks: z.array(z.string()),
  });

const HttpNetworkEventInitiatorSchema = z.object({
    __typename: z.literal('HttpNetworkEventInitiator'),
    origin: z.nullable(z.string()),
    lineNumber: z.nullable(z.number()),
});

const NetworkEventTimingSchema = z.object({
    __typename: z.literal('NetworkEventTiming'),
    at: z.date(),
    until: z.date(),
  });

const HttpNetworkTimingsSchema = z.object({
    __typename: z.literal('HttpNetworkTimings'),
    queued: NetworkEventTimingSchema,
    blocked: NetworkEventTimingSchema,
    connect: NetworkEventTimingSchema,
    ssl: NetworkEventTimingSchema,
    send: NetworkEventTimingSchema,
    wait: NetworkEventTimingSchema,
    receive: NetworkEventTimingSchema,
});

const HttpNetworkEventSchema = z.object({
    id: z.string(),
    __typename: z.literal('HttpNetworkEvent'),
    resourceType: z.string(),
    at: z.date(),
    until: z.date(),
    initiator: HttpNetworkEventInitiatorSchema,
    request: HttpNetworkRequestSchema,
    response: HttpNetworkResponseSchema,
    timings: HttpNetworkTimingsSchema,
  });

type HttpNetworkEventType = z.infer<typeof HttpNetworkEventSchema>;

const NetworkDataSchema = z.object({
    log: z.object({
      entries: z.array(HttpNetworkEventSchema),
    }),
  });

  const mapNetworkEvents =  (networkData: unknown, testExecutionId: string) => 
  Object.fromEntries(NetworkDataSchema.parse(networkData).log.entries.reduce(
      (acc: [string, HttpNetworkEventType][], curr: HttpNetworkEventType, idx) => {

      if (!curr.request.url.url.includes('/__/') && !curr.request.url.url.includes('/__cypress/')) {
        const id = `${testExecutionId}/network/${idx + 1}`;
        return [...acc, [id, curr]]
      }

      return acc;
    }, []))
    
// const convertNameValuesToKeyValuePairs = (
//     valuesPairs: { name: string; value: string }[]
// ) =>
//     valuesPairs.map(({ name, value }) => {
//         return { __typename: 'KeyValuePair' as const, key: name, value: value };
//     });

// const convertToNetworkEventTiming = (
//     startedTimestamp: number,
//     timings: {
//         queued?: number;
//         blocked?: number;
//         connect: number;
//         ssl?: number;
//         send: number;
//         wait: number;
//         receive: number;
//     }
// ) => {
//     const timingValues = [
//         timings.queued || 0,
//         timings.blocked || 0,
//         timings.connect - (timings?.ssl || 0),
//         timings.ssl || 0,
//         timings.send,
//         timings.wait,
//         timings.receive,
//     ];

//     const cumStartTimes = timingValues
//         .slice(0, -1)
//         .reduce(
//             (result, curValue) => [...result, (result.at(-1) || 0) + curValue],
//             [startedTimestamp]
//         );

//     const [queued, blocked, connect, ssl, send, wait, receive] = Array.from(
//         timingValues
//     ).map((curValue, idx) => {
//         const untilTime = cumStartTimes[idx] + curValue;

//         return {
//             at: new Date(cumStartTimes[idx]),
//             until: new Date(untilTime),
//             __typename: 'NetworkEventTiming' as const,
//         };
//     });

//     return {
//         queued,
//         blocked,
//         connect,
//         ssl,
//         send,
//         wait,
//         receive,
//         __typename: 'HttpNetworkTimings' as const,
//     };
// };

// const mapNetworkEvents =  (networkData: unknown, testExecutionId: string) => Object.fromEntries(
//     networkData.log.entries
//         .map((datum: any, idx: number) => {
//             const {
//                 startedDateTime,
//                 time,
//                 _initiator,
//                 _initiator_line,
//                 _resourceType: resourceType,
//                 request,
//                 response,
//                 timings,
//             } = datum;

//             const startedTimestamp = new Date(
//                 Date.parse(startedDateTime)
//             ).getTime();

//             const id = `${testExecutionId}/network/${idx + 1}`;

//             const convertedDatum = {
//                 id,
//                 __typename: 'HttpNetworkEvent' as const,
//                 resourceType,
//                 at: new Date(Date.parse(startedDateTime)),
//                 until: new Date(startedTimestamp + time),
//                 initiator: {
//                     __typename: 'HttpNetworkEventInitiator' as const,
//                     origin: _initiator || null,
//                     lineNumber: _initiator_line || null
//                 },
//                 request: {
//                     __typename: 'HttpNetworkRequest' as const,
//                     method: request.method,
//                     url: {
//                         __typename: 'HttpNetworkRequestUrl' as const,
//                         url: request.url,
//                         nonKeyValueQueryString: null,
//                     },
//                     queryString: convertNameValuesToKeyValuePairs(
//                         request.queryString
//                     ),
//                     cookies: request.cookies.map(({ ...arg }) => {
//                         return { __typename: 'Cookie' as const, ...arg };
//                     }),
//                     headers: {
//                         __typename: 'HttpHeaders' as const,
//                         size: request.headers.length,
//                         values: convertNameValuesToKeyValuePairs(
//                             request.headers
//                         ),
//                     },
//                     httpVersion: request.httpVersion,
//                     body:
//                         (request.postData && {
//                             __typename: 'HttpRequestBody' as const,
//                             size: request.bodySize,
//                             mimeType: request.postData.mimeType,
//                             data: request.postData.text || '',
//                             encoding: null, // TODO: what should this be?
//                         }) ||
//                         null,
//                 },
//                 response: {
//                     __typename: 'HttpNetworkResponse' as const,
//                     redirectURL: response.redirectURL,
//                     status: response.status,
//                     statusText: response.statusText,
//                     body: {
//                         __typename: 'HttpResponseBody' as const,
//                         size: response.bodySize,
//                         mimeType: response.content.mimeType,
//                         data: response.content.text || '',
//                         encoding: null,
//                         chunks: [],
//                     },
//                     // @ts-ignore
//                     cookies: response?.cookies.map(({ ...arg }) => {
//                         return { __typename: 'Cookie' as const, ...arg };
//                     }),
//                     headers: {
//                         __typename: 'HttpHeaders' as const,
//                         size: response.headers.length,
//                         values: convertNameValuesToKeyValuePairs(
//                             response.headers
//                         ),
//                     },
//                     httpVersion: request.httpVersion,
//                     transferSize: response._transferSize,
//                     chucks: [], // TODO: we are not using this right now
//                 },
//                 timings: convertToNetworkEventTiming(startedTimestamp, timings),
//             };

//             return convertedDatum;
//         })
//         .filter(
//             (datum: any) =>
//                 !datum.request.url.url.includes('/__/') &&
//                 !datum.request.url.url.includes('/__cypress/')
//         )
//         .map((datum: any) => [datum.id, datum])
// );

export default mapNetworkEvents;
