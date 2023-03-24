import { TestExecutionEventFilterInput, TestExecutionEventType } from '../resolvers/types/generated.js';

import { getLogs } from './ConsoleEvent.js';

import { data as httpNetworkEvent } from './NetworkEvent.js';

export class TestExecution {
    getById(id: string) {
        if (id === '00343af4-acf3-473b-9975-0c2bd26e47o1') {
            return {
                id: '00343af4-acf3-473b-9975-0c2bd26e47o1',
                at: new Date('2023-02-07T15:22:40.909Z'),
                until: new Date('2023-02-07T15:22:54.348Z'),
            };
        }

        return null;
    }

    async getEvents(id: string, args: {
        first?: number | null, after?: string | null, filter?: TestExecutionEventFilterInput | null;
    }) {
        const requestId = '00343af4-acf3-473b-9975-0c2bd26e47o1';
        if (id !== requestId)
            throw new Error('Not implemented');

        const filters = args?.filter;
        const consoleFilters = filters?.consoleFilter;

        const logs = await getLogs(requestId);

        let data = ([
            ...Object.values(logs),
            ...Object.values(httpNetworkEvent),
        ]).sort((a, b) => {
            return a.at.getTime() - b.at.getTime();
        }).filter((evt) => {
            return filters?.type?.some((type) => {
                switch (type) {
                    case TestExecutionEventType.Console: {
                        if(evt.__typename !== 'ConsoleLogEvent') return false;
                        const { logLevel, message } = evt;

                        if (
                            consoleFilters?.logLevel &&
                            !consoleFilters.logLevel?.includes(logLevel)
                        ) {
                            return false;
                        }
                        if (
                            consoleFilters?.logSearch &&
                            !message
                                ?.toLowerCase()
                                .includes(
                                    consoleFilters.logSearch.toLowerCase()
                                )
                        ) {
                            return false;
                        }

                        return true;
                    }
                    case TestExecutionEventType.Network: {
                        return evt.__typename === 'HttpNetworkEvent';
                    }
                    default: {
                        throw new Error(`Type ${type} not implemented`);
                    }
                }
            }) ?? true
        });

        // TODO: Paginate in a database? Paginate utils?
        let start = 0;
        if (args.after) {
            start = data.findIndex(({ id }) => id === args.after);
            if (start === -1) {
                throw new Error('Invalid Cursor');
            }
            start += 1;
        }

        let end = data.length;
        if (args.first != null) {
            if (args.first < 0)
                throw new Error('Invalid first');
            end = Math.min(end, start + args.first)
        }

        return {
            edges: data
                .slice(start, end)
                .map((dataPoint) => ({
                    cursor: dataPoint.id,
                    node: dataPoint,
                })),
            totalCount: data.length,
            hasPreviousPage: start > 0,
            hasNextPage: end < data.length,
        };
    }
}
