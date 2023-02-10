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
}
