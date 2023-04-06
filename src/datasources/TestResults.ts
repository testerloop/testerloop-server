import DataLoader from 'dataloader';
import config from '../config.js';
import { Context } from '../context.js';
import S3Service from '../S3Service.js';
import * as z from 'zod';

const ResultsSchema = z.object({
  browserVersion: z.string(),
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
    
    async getById(id: string ) {
        return this.getResultsByRunId(id);
    };
}
