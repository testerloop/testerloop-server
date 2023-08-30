import DataLoader from 'dataloader';

import S3Service from '../S3Service.js';
import mapSteps from '../maps/mapSteps.js';

import { BaseDataSource } from './BaseDatasource.js';

export class StepEvent extends BaseDataSource {
    stepByTestExecutionIdDataLoader = new DataLoader<
        string,
        ReturnType<typeof mapSteps>
    >((ids) => {
        return Promise.all(
            ids
                .map(async (testExecutionId) => {
                    const [steps, results] = await Promise.all([
                        S3Service.getObject(
                            this.bucketName,
                            `${this.bucketPath}/${testExecutionId}/cypress/out.json`,
                        ),
                        this.context.dataSources.testResults.getResultsByTestExecutionId(
                            testExecutionId,
                        ),
                    ]);
                    const mappedSteps = mapSteps(
                        steps,
                        testExecutionId,
                        new Date(results.endedTestsAt),
                    );

                    return mappedSteps;
                })
                .map((promise) => promise.catch((error) => error)),
        );
    });

    async getStepsByTestExecutionId(testExecutionId: string) {
        return this.stepByTestExecutionIdDataLoader.load(testExecutionId);
    }

    async getById(id: string) {
        const [runId, requestId, _] = id.split('/');
        const steps = await this.getStepsByTestExecutionId(
            `${runId}/${requestId}`,
        );
        return steps[id] ?? null;
    }
}
