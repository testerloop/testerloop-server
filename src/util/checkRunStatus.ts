import { RunStatus, TestStatus } from '../resolvers/types/generated.js';
import type { DataSources } from '../datasources/index.js';
import type { Results, Test } from '../datasources/TestResults.js';

export async function checkS3ResultsExistAndGetData(
    testRunId: string,
    testExecutionId: string,
    dataSources: DataSources,
): Promise<Results | null> {
    const s3Path = `${testRunId}/${testExecutionId}`;
    const fileExists = await dataSources.testResults.doResultsExist(s3Path);

    if (!fileExists) {
        return null;
    }

    return await dataSources.testResults.getById(s3Path);
}

export function getRunStatusAndOutcome(testResults: Results | null) {
    if (!testResults) {
        return {
            runStatus: RunStatus.Queued,
            testStatus: TestStatus.Pending,
            testName: '',
        };
    }

    const testName = testResults.runs[0]?.tests[0]?.title.slice(-1)[0] ?? '';
    const allTestsPassed = testResults.runs[0]?.tests.every(
        (test: Test) => test.state === 'passed',
    );

    const runStatus =
        testResults.status === 'finished'
            ? RunStatus.Completed
            : RunStatus.Running;
    const testStatus = allTestsPassed ? TestStatus.Passed : TestStatus.Failed;

    return { runStatus, testStatus, testName };
}
