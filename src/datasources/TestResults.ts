import DataLoader from 'dataloader';
import config from '../config.js';
import { Context } from '../context.js';
import S3Service from '../S3Service.js';
import * as z from 'zod';

const TestSchema = z.object({
    title: z.array(z.string()),
    state: z.string(),
});

const RunSchema = z.object({
    tests: z.array(TestSchema)
})

const ResultsSchema = z.object({
    status: z.string(),
    startedTestsAt: z.string(),
    endedTestsAt: z.string(),
    browserVersion: z.string(),
    runs: z.array(RunSchema)
});

type Results = z.infer<typeof ResultsSchema>;

export class TestResults {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    resultsByTestExecutionIdDataLoader = new DataLoader<string, Results>(
        (ids) => Promise.all(ids.map(async (testExecutionId) => {
            const bucketName = config.AWS_BUCKET_NAME;
            const bucketPath = config.AWS_BUCKET_PATH;
            const rawResults = await S3Service.getObject(bucketName, `${bucketPath}${testExecutionId}/cypress/results.json`)
            const results = ResultsSchema.parse(rawResults);
            return results;
        }))
    )
    async getResultsByTestExecutionId(testExecutionId: string) {
        return this.resultsByTestExecutionIdDataLoader.load(testExecutionId);
    }
    
    async getById(id: string) {
        return this.getResultsByTestExecutionId(id);
    }

    async doResultsExist(testExecutionId: string) {
        const bucketName = config.AWS_BUCKET_NAME;
        const bucketPath = config.AWS_BUCKET_PATH;
        const s3Key = `${bucketPath}${testExecutionId}/cypress/results.json`;
        return S3Service.doesFileExist(bucketName, s3Key);
    }
}
