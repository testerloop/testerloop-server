import { z } from 'zod';

const CookieSchema = z.object({
    name: z.string(),
    value: z.string(),
    domain: z.nullable(z.string()),
    path: z.nullable(z.string()),
    secure: z.boolean(),
    httpOnly: z.boolean(),
    expires: z.nullable(z.string()),
});

const NameValueSchema = z.object({
    name: z.string(),
    value: z.string(),
});

const HttpNetworkRequestPostDataSchema = z.object({
    mimeType: z.string(),
    text: z.nullable(z.string())
})

const HttpNetworkRequestSchema = z.object({
    method: z.string(),
    url: z.string(),
    queryString: z.array(NameValueSchema),
    cookies: z.array(CookieSchema),
    headers: z.array(NameValueSchema),
    httpVersion: z.string(),
    bodySize: z.number(),
    postData: z.optional(HttpNetworkRequestPostDataSchema)
  });

const HttpNetworkResponseContentSchema = z.object({
    size: z.number(),
    mimeType: z.string(),
    text: z.optional(z.string()),
});

const HttpNetworkResponseSchema = z.object({
    redirectURL: z.string(),
    status: z.number(),
    statusText: z.string(),
    content: HttpNetworkResponseContentSchema,
    cookies: z.array(CookieSchema),
    headers: z.array(NameValueSchema),
    httpVersion: z.string(),
    _transferSize: z.number(),
    bodySize: z.number()
  });


const HttpNetworkTimingsSchema = z.object({
    _queued: z.optional(z.number()),
    blocked: z.number(),
    connect: z.number(),
    ssl: z.number(),
    send: z.number(),
    wait: z.number(),
    receive: z.number(),
});

const HttpNetworkEventSchema = z.object({
    _resourceType: z.string(),
    startedDateTime: z.string(),
    _initiator: z.optional(z.string()),
    _initiator_line: z.optional(z.nullable(z.number())),
    request: HttpNetworkRequestSchema,
    response: HttpNetworkResponseSchema,
    time: z.number(),
    timings: HttpNetworkTimingsSchema,
  });

type HttpNetworkEventType = z.infer<typeof HttpNetworkEventSchema>;

const NetworkDataSchema = z.object({
    log: z.object({
      entries: z.array(HttpNetworkEventSchema),
    }),
  });

const convertToNetworkEventTiming = (
    startedTimestamp: number,
    timings: {
        _queued?: number;
        blocked?: number;
        connect: number;
        ssl?: number;
        send: number;
        wait: number;
        receive: number;
    }
) => {
    const timingValues = [
        timings._queued || 0,
        timings.blocked || 0,
        timings.connect - (timings?.ssl || 0),
        timings.ssl || 0,
        timings.send,
        timings.wait,
        timings.receive,
    ];

    const cumStartTimes = timingValues
        .slice(0, -1)
        .reduce(
            (result, curValue) => [...result, (result.at(-1) || 0) + curValue],
            [startedTimestamp]
        );

    const [queued, blocked, connect, ssl, send, wait, receive] = Array.from(
        timingValues
    ).map((curValue, idx) => {
        const untilTime = cumStartTimes[idx] + curValue;

        return {
            at: new Date(cumStartTimes[idx]),
            until: new Date(untilTime),
            __typename: 'NetworkEventTiming' as const,
        };
    });

    return {
        queued,
        blocked,
        connect,
        ssl,
        send,
        wait,
        receive,
        __typename: 'HttpNetworkTimings' as const,
    };
};

const convertNameValuesToKeyValuePairs = (
    valuesPairs: { name: string; value: string }[]
) =>
    valuesPairs.map(({ name, value }) => {
        return { __typename: 'KeyValuePair' as const, key: name, value: value };
    });

const transformEntry = (entry: HttpNetworkEventType, testExecutionId: string, idx: number) => {
    const {
        startedDateTime,
        time,
        _initiator,
        _initiator_line,
        _resourceType: resourceType,
        request,
        response,
        timings,
    } = entry;
        
    const startedTimestamp = new Date(
        Date.parse(startedDateTime)
    ).getTime();

    return {
            __typename: 'HttpNetworkEvent' as const,
            resourceType,
            at: new Date(Date.parse(startedDateTime)),
            until: new Date(startedTimestamp + time),
            initiator: {
                __typename: 'HttpNetworkEventInitiator' as const,
                origin: _initiator || null,
                lineNumber: _initiator_line || null
            },
            timings: convertToNetworkEventTiming(startedTimestamp, timings),
            request: {
                __typename: 'HttpNetworkRequest' as const,
                method: request.method,
                url: {
                    __typename: 'HttpNetworkRequestUrl' as const,
                    url: request.url,
                    nonKeyValueQueryString: null,
                },
                queryString: convertNameValuesToKeyValuePairs(
                    request.queryString
                ),
                cookies: request.cookies.map(({ ...arg }) => {
                    return { __typename: 'Cookie' as const, ...arg };
                }),
                headers: {
                    __typename: 'HttpHeaders' as const,
                    size: request.headers.length,
                    values: convertNameValuesToKeyValuePairs(
                        request.headers
                    ),
                },
                httpVersion: request.httpVersion,
                body:
                    (request.postData && {
                        __typename: 'HttpRequestBody' as const,
                        size: request.bodySize,
                        mimeType: request.postData.mimeType,
                        data: request.postData.text || '',
                        encoding: null, // TODO: what should this be?
                    }) ||
                    null,
            },
            response: {
                __typename: 'HttpNetworkResponse' as const,
                redirectURL: response.redirectURL,
                status: response.status,
                statusText: response.statusText,
                body: {
                    __typename: 'HttpResponseBody' as const,
                    size: response.bodySize,
                    mimeType: response.content.mimeType,
                    data: response.content.text || '',
                    encoding: null,
                    chunks: [],
                },
                cookies: response?.cookies.map(({ ...arg }) => {
                    return { __typename: 'Cookie' as const, ...arg };
                }),
                headers: {
                    __typename: 'HttpHeaders' as const,
                    size: response.headers.length,
                    values: convertNameValuesToKeyValuePairs(
                        response.headers
                    ),
                },
                httpVersion: request.httpVersion,
                transferSize: response._transferSize,
                chunks: [], // TODO: we are not using this right now
            },
        }        
}

const mapNetworkEvents =  (networkData: unknown, testExecutionId: string) => 
    Object.fromEntries(NetworkDataSchema.parse(networkData).log.entries
        .map((entry, idx) => transformEntry(entry, testExecutionId, idx))
        .filter(curr => !curr.request.url.url.includes('/__/') && 
                        !curr.request.url.url.includes('/__cypress/'))
        .map((curr, idx) => [`${testExecutionId}/network/${idx + 1}`, 
            {id: `${testExecutionId}/network/${idx + 1}`, ...curr}]))
   
    

export default mapNetworkEvents;
