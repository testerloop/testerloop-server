import { TestExecutionEventFilterInput, TestExecutionEventType } from '../resolvers/types/generated.js';
import { TestExecutionEvent } from '../resolvers/types/mappers';

import { getLogs } from './ConsoleEvent.js';

export class TestExecution {
    getById(id: string) {
        if (id === '1234') {
            return {
                id: '1234',
                at: new Date('2023-02-07T15:22:40.909Z'),
                until: new Date('2023-02-07T15:22:54.348Z'),
            };
        }

        return null;
    }

    async getEvents(id: string, args: {
        first?: number | null, after?: string | null, filter?: TestExecutionEventFilterInput | null;
    }) {
        if (id !== '1234')
            throw new Error('Not implemented');

        const filters = args?.filter;
        const consoleFilters = filters?.consoleFilter;

        const logs = await getLogs();

        let data: TestExecutionEvent[] = [
            ...logs,
        ]
            .filter(({ __typename, logLevel, message }) =>
                filters?.type?.some((type) => {
                    switch (type) {
                        case TestExecutionEventType.Console:
                            if (consoleFilters?.logLevel && !consoleFilters.logLevel?.includes(logLevel)) {
                                return false;
                            }
                            if (consoleFilters?.logSearch &&
                                !message?.toLowerCase().includes(consoleFilters.logSearch.toLowerCase())) {
                                return false;
                            }
                            return __typename === 'ConsoleLogEvent';
                        default:
                            throw new Error(`Type ${type} not implemented`);
                    }
                }) ?? true
                ,
            );

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
