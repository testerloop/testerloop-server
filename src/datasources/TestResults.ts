import DataLoader from 'dataloader';
import * as z from 'zod';

import config from '../config.js';
import { Context } from '../context.js';
import S3Service from '../S3Service.js';
import { RunStatus, TestStatus } from '../resolvers/types/generated.js';

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

export class TestResults {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    resultsByTestExecutionIdDataLoader = new DataLoader<string, Results>(
        (ids) =>
            Promise.all(
                ids.map(async (testExecutionId) => {
                    const bucketName = config.AWS_BUCKET_NAME;
                    const bucketPath = config.AWS_BUCKET_PATH;
                    const rawResults = await S3Service.getObject(
                        bucketName,
                        `${bucketPath}${testExecutionId}/cypress/results.json`,
                    );
                    const results = ResultsSchema.parse(rawResults);
                    return results;
                }),
            ),
    );
    async doResultsExist(testExecutionId: string) {
        const bucketName = config.AWS_BUCKET_NAME;
        const bucketPath = config.AWS_BUCKET_PATH;
        const s3Key = `${bucketPath}${testExecutionId}/cypress/results.json`;
        return S3Service.doesFileExist(bucketName, s3Key);
    }

    async checkS3ResultsExistAndGetData(
        testRunId: string,
        testExecutionId: string,
    ): Promise<Results | null> {
        const s3Path = `${testRunId}/${testExecutionId}`;
        const fileExists = await this.doResultsExist(s3Path);

        if (!fileExists) {
            return null;
        }

        return await this.getById(s3Path);
    }

    getRunStatusAndOutcome(testResults: Results | null) {
        if (!testResults) {
            return {
                runStatus: RunStatus.Queued,
                testStatus: TestStatus.Pending,
                testName: '',
            };
        }

        const testName =
            testResults.runs[0]?.tests[0]?.title.slice(-1)[0] ?? '';
        const allTestsPassed = testResults.runs[0]?.tests.every(
            (test: Test) => test.state === 'passed',
        );

        const runStatus =
            testResults.status === 'finished'
                ? RunStatus.Completed
                : RunStatus.Running;
        const testStatus = allTestsPassed
            ? TestStatus.Passed
            : TestStatus.Failed;

        return { runStatus, testStatus, testName };
    }

    async getResultsByTestExecutionId(testExecutionId: string) {
        return this.resultsByTestExecutionIdDataLoader.load(testExecutionId);
    }

    async getById(id: string) {
        return this.getResultsByTestExecutionId(id);
    }
}
