import { TestExecutionEvent } from '../resolvers/types/mappers';

import { data as consoleLogData } from './ConsoleEvent';

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

    getEvents(id: string, pagination: { first?: number | null, after?: string | null }) {
        if (id !== '1234')
            throw new Error('Not implemented');

        const data: TestExecutionEvent[] = Object.values(consoleLogData).map(
            (d) => ({ __typename: d.__typename, id: d.id }))

        // TODO: Paginate in a database? Paginate utils?
        let start = 0;
        if (pagination.after) {
            start = data.findIndex(({ id }) => id === pagination.after);
            if (start === -1) {
                throw new Error('Invalid Cursor');
            }
            start += 1;
        }

        let end = data.length;
        if (pagination.first != null) {
            if (pagination.first < 0)
                throw new Error('Invalid first');
            end = Math.min(end, start + pagination.first)
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
