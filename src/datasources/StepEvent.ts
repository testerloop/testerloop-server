import DataLoader from 'dataloader';
import { Context } from '../context.js';
import config from '../config.js';
import S3Service from '../S3Service.js';
import mapSteps from '../maps/mapSteps.js';

export class StepEvent {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    stepByTestExecutionIdDataLoader = new DataLoader<string, ReturnType<typeof mapSteps>>(
        (ids) => Promise.all(ids.map(async (testExecutionId) => {
            const bucketName = config.AWS_BUCKET_NAME;
            const [steps, results] = await Promise.all([
                S3Service.getObject(bucketName, `${testExecutionId}/cypress/out.json`),
                this.context.dataSources.testResults.getResultsByTestExecutionId(testExecutionId)
            ])
            const mappedSteps = mapSteps(steps, testExecutionId, new Date(results.endedTestsAt));

            return mappedSteps;
        }))
    )
    async getStepsByTestExecutionId(testExecutionId: string) {
        return this.stepByTestExecutionIdDataLoader.load(testExecutionId);
    }

    async getById(id: string) {
        const [runId, requestId, _] = id.split('/');
        const steps = await this.getStepsByTestExecutionId(`${runId}/${requestId}`);
        return steps[id] ?? null;
    }
}
