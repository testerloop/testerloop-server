import { assertNonNull } from '../util/assertNonNull.js';
import { encodeId } from '../util/id.js';

import { TestExecutionResolvers } from './types/generated.js';

const resolvers: TestExecutionResolvers = {
    async at({ id }, _args, { dataSources }) {
        const testExecution = assertNonNull(
            await dataSources.testExecution.getById(id),
        );
        return testExecution.at;
    },
    events({ id }, { after, first, filter }, { dataSources }) {
        return dataSources.testExecution.getEvents(id, {
            after,
            first,
            filter,
        });
    },
    id({ id }) {
        return encodeId('TestExecution', id);
    },
    async until({ id }, _args, { dataSources }) {
        const testExecution = assertNonNull(
            await dataSources.testExecution.getById(id),
        );
        return testExecution.until;
    },
    async title({ id }, _args, { dataSources }) {
        const results = await dataSources.testResults.getById(id);
        return results.runs[0].tests[0].title.slice(-1)[0];
    },
    async testRun({ id }, _args) {
        const [runId, _] = id.split('/');
        return {
            __typename: 'TestRun',
            id: runId,
            testExecutionId: id,
        };
    },
    async rerunOf({ id }, _args, { repository, auth }) {
        const [runId, _] = id.split('/');
        const rerunTestExecutionId = auth
            ? await repository.getRerunOfId(id)
            : null;
        return rerunTestExecutionId
            ? {
                  __typename: 'TestExecution',
                  id: rerunTestExecutionId,
                  testRun: { __typename: 'TestRun', id: runId },
              }
            : null;
    },

    async reruns({ id }, { first, after }, { dataSources }) {
        const { edges, hasNextPage, hasPreviousPage, totalCount } =
            await dataSources.testExecution.getByTestRunId(id, {
                first,
                after,
            });
        return {
            edges: edges.map(({ cursor, node }) => ({
                cursor,
                node: {
                    __typename: 'TestExecution',
                    id: `${id}/${node.id}`,
                    testRun: {
                        __typename: 'TestRun',
                        id,
                    },
                },
            })),
            totalCount,
            hasNextPage,
            hasPreviousPage,
        };
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
};

export default resolvers;
