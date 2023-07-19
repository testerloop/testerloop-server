import { RunStatus, TestStatus } from '../resolvers/types/generated.js';
import type { DataSources } from '../datasources/index.js';
import type { Results, Test } from '../datasources/TestResults.js';

export async function checkS3ResultsExistAndGetData(
    testRunId: string,
    testExecutionId: string,
    dataSources: DataSources,
) {
    const fileExists = await dataSources.testResults.doResultsExist(
        `${testRunId}/${testExecutionId}`,
    );

    if (fileExists) {
        return await dataSources.testResults.getById(
            `${testRunId}/${testExecutionId}`,
        );
    }

    return null;
}

export function getRunStatusAndOutcome(testResults: Results) {
    let runStatus;
    let testStatus;
    const testName = testResults.runs[0].tests[0].title.slice(-1)[0] ?? '';

    if (testResults) {
        if (testResults.status === 'finished') {
            runStatus = RunStatus.Completed;
            testStatus = testResults.runs[0].tests.every(
                (test: Test) => test.state === 'passed',
            )
                ? TestStatus.Passed
                : TestStatus.Failed;
        } else {
            runStatus = RunStatus.Running;
            testStatus = TestStatus.Pending;
        }
    } else {
        runStatus = RunStatus.Queued;
        testStatus = TestStatus.Pending;
    }

    return { runStatus, testStatus, testName };
}
