import { ConsoleLogLevel, TestExecutionEventType } from '../resolvers/types/generated.js';
import { TestExecutionEvent } from '../resolvers/types/mappers';

import { data as consoleLogData } from './ConsoleEvent.js';

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

    getEvents(id: string, args: {
        first?: number | null, after?: string | null, type?: readonly TestExecutionEventType[] | null,
        logLevel?: readonly ConsoleLogLevel[] | null
    }) {
        if (id !== '1234')
            throw new Error('Not implemented');

        let data: TestExecutionEvent[] = [
            ...Object.values(consoleLogData),
        ]
            .filter(({ __typename, logLevel }) =>
                args.type?.some((type) => {
                    switch (type) {
                        case TestExecutionEventType.Console:
                            if (args?.logLevel && !args.logLevel?.includes(logLevel)) {
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
