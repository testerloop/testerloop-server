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

export class TestResults {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    resultsByRunIdDataLoader = new DataLoader<string, Results>(
        (ids) => Promise.all(ids.map(async (runId) => {
            const bucketName = config.AWS_BUCKET_NAME;
            const rawResults = await S3Service.getObject(bucketName, `${runId}/logs/results.json`)
            const results = ResultsSchema.parse(rawResults);
            return results;
        }))
    )
    async getResultsByRunId(runId: string) {
        return this.resultsByRunIdDataLoader.load(runId);
    }
    
    async getById(id: string) {
        const [runId, _] = id.split('/');
        return this.getResultsByRunId(runId);
    };
}
