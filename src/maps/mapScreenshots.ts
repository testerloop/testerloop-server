import path from 'path';

type RawScreenshot = {
    name: string;
    signedUrl: {
        url: string;
        expiresAt: Date;
    };
}

const mapScreenshots = (rawScreenshots: RawScreenshot[], testExecutionId: string) => {
    return Object.fromEntries(
        rawScreenshots.map((ss) => {
            const fileName = path.basename(ss.name, path.extname(ss.name));
            const id = `${testExecutionId}/screenshot/${fileName}`;
            return [
                id,
                {
                    __typename: 'TestExecutionScreenshot' as const,
                    ...ss,
                    id,
                    at: new Date(parseInt(fileName)),
                    testExecutionId
                }
            ]
        })
    );
}

export default mapScreenshots;
