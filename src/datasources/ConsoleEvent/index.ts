import DataLoader from 'dataloader';

import S3Service from '../../S3Service.js';
import { BaseDataSource } from '../BaseDatasource.js';

import { Log, parseLogFile } from './fileSchema.js';

export class ConsoleEvent extends BaseDataSource {
    logByTestExecutionIdDataLoader = new DataLoader<
        string,
        Record<string, Log>
    >((ids) =>
        Promise.all(
            ids
                .map(async (testExecutionId) => {
                    const json = await S3Service.getObject(
                        this.bucketName,
                        `${this.bucketPath}/${testExecutionId}/console/console-logs.json`,
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
                })
                .map((promise) => promise.catch((error) => error)),
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
