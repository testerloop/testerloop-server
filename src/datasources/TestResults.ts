import config from '../config.js';
import { Context } from '../context.js';
import S3Service from '../S3Service.js';

type Results = {
    browserVersion: string
}

export const getResultsFile = async (runId: string) => {
    const bucketName = config.AWS_BUCKET_NAME;
    const results = await S3Service.getObject(bucketName, `${runId}/logs/results.json`) as Results
    return results;
}
export class TestResults {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }
    
    async getById(id: string ) {
        return getResultsFile(id);
    };
}
