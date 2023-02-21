// @ts-ignore
import networkData from '../rawData/network-events.har.json' assert { type: 'json' };

const convertNameValuesToKeyValuePairs = (
    valuesPairs: { name: string; value: string }[]
) =>
    valuesPairs.map(({ name, value }) => {
        return { __typename: 'KeyValuePair' as const, key: name, value: value };
    });

const convertToNetworkEventTiming = (
    startedTimestamp: number,
    timings: {
        queued?: number;
        blocked?: number;
        connect: number;
        ssl?: number;
        send: number;
        wait: number;
        receive: number;
    }
) => {
    // TODO: please review this, this is my best guess
    const timingValues = [
        timings.queued || 0,
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

export const data = Object.fromEntries(
    networkData.log.entries
        .map((datum, idx) => {
            const {
                startedDateTime,
                time,
                _initiator,
                _initiator_line,
                _resourceType: resourceType,
                request,
                response,
                timings,
            } = datum;
            const startedTimestamp = new Date(
                Date.parse(startedDateTime)
            ).getTime();
            const convertedDatum = {
                id: idx.toString(),
                __typename: 'HttpNetworkEvent' as const,
                resourceType,
                startedDateTime: startedDateTime,
                at: new Date(Date.parse(startedDateTime)),
                time: {
                    __typename: 'NetworkEventTime' as const,
                    at: new Date(Date.parse(startedDateTime)),
                    until: new Date(startedTimestamp + time),
                },
                initiator: {
                    __typename: 'HttpNetworkEventInitiator' as const,
                    origin: _initiator || null,
                    lineNo: _initiator_line || null
                },
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
                    // @ts-ignore
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
                    chucks: [], // TODO: we are not using this right now
                },
                timings: convertToNetworkEventTiming(startedTimestamp, timings),
            };

            return convertedDatum;
        })
        .filter(
            (datum) =>
                !datum.request.url.url.includes('/__/') &&
                !datum.request.url.url.includes('/__cypress/')
        )
        .map((datum) => [datum.id, datum])
);

export class NetworkEvent {
    getById(id: string) {
        return data[id] ?? null;
    }
}
