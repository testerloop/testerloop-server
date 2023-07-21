import DataLoader from 'dataloader';

import { Context } from '../../context.js';
import config from '../../config.js';
import S3Service from '../../S3Service.js';

import { Log, parseLogFile } from './fileSchema.js';

export class ConsoleEvent {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    logByTestExecutionIdDataLoader = new DataLoader<
        string,
        Record<string, Log>
    >((ids) =>
        Promise.all(
            ids.map(async (testExecutionId) => {
                const bucketName = config.AWS_BUCKET_NAME;
                const bucketPath = config.AWS_BUCKET_PATH;
                const json = await S3Service.getObject(
                    bucketName,
                    `${bucketPath}${testExecutionId}/console/console-logs.json`,
                );
                const parsed = parseLogFile(json);
                return Object.fromEntries(
                    parsed
                        .map((log) => ({
                            ...log,
                            id: `${testExecutionId}/console/${log.id}`,
                        }))
                        .map((log) => [log.id, log]),
                );
            }),
        ),
    );
    async getLogsByTestExecutionId(testExecutionId: string) {
        return Object.fromEntries(
            Object.entries(
                await this.logByTestExecutionIdDataLoader.load(testExecutionId),
            ).map(([key, log]) => [
                key,
                {
                    __typename: 'ConsoleLogEvent' as const,
                    id: log.id,
                    // TODO: These shouldn't be required.
                    at: log.timestamp,
                    logLevel: log.type,
                    message: JSON.stringify(log.args),
                    stackTrace: log.stackTrace,
                },
            ]),
        );
    }

    async getById(id: string) {
        const [runId, requestId, _] = id.split('/');
        const logs = await this.logByTestExecutionIdDataLoader.load(
            `${runId}/${requestId}`,
        );
        return logs[id] ?? null;
    }
}
