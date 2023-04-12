type Args = {
    after: string | null | undefined;
    first: number | null | undefined;
}

const getPaginatedData = (data: any[], args?: Args) => {
    let start = 0;
    if (args?.after) {
        start = data.findIndex(({ id }) => id === args.after);
        if (start === -1) {
            throw new Error('Invalid Cursor');
        }
        start += 1;
    }

    let end = data.length;
    if (args?.first != null) {
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

export default getPaginatedData;
