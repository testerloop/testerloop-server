import { RunStatus } from '../resolvers/types/generated.js';
import { TestOutcome } from '../resolvers/types/generated.js';

export async function checkS3ResultsExistAndGetData(
    testRunId: string,
    testExecutionId: string,
    dataSources: any
) {
    const fileExists = await dataSources.testResults.doResultsExist(
        `${testRunId}/${testExecutionId}`
    );

    if (fileExists) {
        return await dataSources.testResults.getById(
            `${testRunId}/${testExecutionId}`
        );
    }

    return null;
}

export function getRunStatusAndOutcome(testResults: any) {
    let runStatus;
    let testOutcome;
    const testName = testResults.runs[0].tests[0].title.slice(-1)[0] ?? '';

    if (testResults) {
        if (testResults.status === 'finished') {
            runStatus = RunStatus.Completed;
            testOutcome = testResults.runs[0].tests.every(
                (test: any) => test.state === 'passed'
            )
                ? TestOutcome.Passed
                : TestOutcome.Failed;
        } else {
            runStatus = RunStatus.Running;
            testOutcome = TestOutcome.NotYetCompleted;
        }
    } else {
        runStatus = RunStatus.Queued;
        testOutcome = TestOutcome.NotYetCompleted;
    }

    return { runStatus, testOutcome, testName };
}
