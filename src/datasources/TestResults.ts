import DataLoader from 'dataloader';
import * as z from 'zod';

import S3Service from '../S3Service.js';

import { BaseDataSource } from './BaseDatasource.js';

const TestSchema = z.object({
    title: z.array(z.string()),
    state: z.string(),
});

const RunSchema = z.object({
    tests: z.array(TestSchema),
});

const ResultsSchema = z.object({
    status: z.string(),
    startedTestsAt: z.string(),
    endedTestsAt: z.string(),
    browserVersion: z.string(),
    runs: z.array(RunSchema),
});

export type Results = z.infer<typeof ResultsSchema>;
export type Test = z.infer<typeof TestSchema>;

export class TestResults extends BaseDataSource {
    resultsByTestExecutionIdDataLoader = new DataLoader<string, Results>(
        (ids) =>
            Promise.all(
                ids
                    .map(async (testExecutionId) => {
                        const rawResults = await S3Service.getObject(
                            this.bucketName,
                            `${this.bucketPath}/${testExecutionId}/cypress/results.json`,
                        );
                        const results = ResultsSchema.parse(rawResults);
                        return results;
                    })
                    .map((promise) => promise.catch((error) => error)),
            ),
    );

    async getResultsByTestExecutionId(testExecutionId: string) {
        return this.resultsByTestExecutionIdDataLoader.load(testExecutionId);
    }

    async getById(id: string) {
        return this.getResultsByTestExecutionId(id);
    }
}
