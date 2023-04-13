import DataLoader from 'dataloader';
import config from '../config.js';
import { Context } from '../context.js';
import S3Service from '../S3Service.js';
import * as z from 'zod';

const TestSchema = z.object({
    title: z.array(z.string())
})

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

export const getResults = async (testExecutionId: string) => {
    const bucketName = config.AWS_BUCKET_NAME;
    const rawResults = await S3Service.getObject(bucketName, `${testExecutionId}/cypress/results.json`)
    const results = ResultsSchema.parse(rawResults);
    return results;
}

export class TestResults {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    resultsByRunIdDataLoader = new DataLoader<string, Results>(
        (ids) => Promise.all(ids.map(async (testExecutionId) => {
            return getResults(testExecutionId)
        }))
    )
    async getResultsByRunId(testExecutionId: string) {
        return this.resultsByRunIdDataLoader.load(testExecutionId);
    }
    
    async getById(id: string) {
        return this.getResultsByRunId(id);
    };
}
