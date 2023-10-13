import { TestExecutionResolvers, TestStatus } from './types/generated.js';

const resolvers: TestExecutionResolvers = {
    id: ({ id }) => id,

    async at({ id }, _args, { repository }) {
        const testExecution =
            await repository.testExecution.getTestExecutionById(id);
        return testExecution.at;
    },
    events({ id }, { after, first, filter }, { dataSources }) {
        return dataSources.testExecution.getEvents(id, {
            after,
            first,
            filter,
        });
    },
    async until({ id }, _args, { repository }) {
        return (await repository.testExecution.getTestExecutionById(id)).until;
    },
    async title({ id }, _args, { repository }) {
        return (await repository.testExecution.getTestExecutionById(id))
            .testName;
    },
    async testRun({ id }, _args, { repository }) {
        const runId = (await repository.testExecution.getTestExecutionById(id))
            .testRunId;
        return {
            __typename: 'TestRun',
            id: runId,
            testExecutionId: id,
        };
    },
    async rerunOf({ id }, _args, { repository, auth }) {
        const rerunTestExecution = auth
            ? await repository.testExecution.getTestExecutionRerunOf(id)
            : null;
        return rerunTestExecution
            ? {
                  __typename: 'TestExecution',
                  id: rerunTestExecution.id,
                  testRun: {
                      __typename: 'TestRun',
                      id: rerunTestExecution.testRunId,
                  },
              }
            : null;
    },

    //TODO - MAKE THIS A CONNECTION TYPE
    async reruns({ id }, _args, { repository }) {
        const reruns =
            await repository.testExecution.getRerunsByTestExecutionId(id);

        return (
            (reruns &&
                reruns.map((rerun) => ({
                    __typename: 'TestExecution',
                    id: rerun.id,
                    testRun: { __typename: 'TestRun', id: rerun.testRunId },
                }))) ??
            []
        );
    },

    async environment({ id }, _args, { dataSources }) {
        const results = await dataSources.testResults.getById(id);
        const [major, minor, build, patch] = results.browserVersion
            .split('.')
            .map((str: string) => parseInt(str));
        return {
            __typename: 'TestExecutionEnvironment',
            browser: {
                __typename: 'ChromiumVersion',
                major,
                minor,
                build,
                patch,
            },
        };
    },
    async status({ id }, _args, { repository }) {
        return (await repository.testExecution.getTestExecutionById(id))
            .result as TestStatus;
    },
};

export default resolvers;
