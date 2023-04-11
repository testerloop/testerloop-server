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
            const steps = await S3Service.getObject(bucketName, `${testExecutionId}/cypress/out.json`) as string[];
            const mappedSteps = mapSteps(steps, testExecutionId);
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
