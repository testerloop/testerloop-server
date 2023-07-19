import path from 'path';

const mapScreenshots = (rawScreenshots: string[], testExecutionId: string) => {
    return Object.fromEntries(
        rawScreenshots.map((fileName) => {
            const name = path.basename(fileName, path.extname(fileName));
            const id = `${testExecutionId}/screenshot/${name}`;
            return [
                id,
                {
                    __typename: 'TestExecutionScreenshot' as const,
                    fileName,
                    id,
                    at: new Date(parseInt(name)),
                    testExecutionId,
                },
            ];
        }),
    );
};

export default mapScreenshots;
