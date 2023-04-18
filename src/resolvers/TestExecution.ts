import { assertNonNull } from '../util/assertNonNull.js';
import { encodeId } from '../util/id.js';
import { TestExecutionResolvers } from './types/generated.js';

const resolvers: TestExecutionResolvers = {
    async at({ id }, _args, { dataSources }) {
        const testExecution = assertNonNull(await dataSources.testExecution.getById(id));
        return testExecution.at;
    },
    events({ id }, { after, first, filter }, { dataSources }) {
        return dataSources.testExecution.getEvents(id, { after, first, filter });
    },
    id({ id }) {
        return encodeId('TestExecution', id);
    },
    async until({ id }, _args, { dataSources }) {
        const testExecution = assertNonNull(await dataSources.testExecution.getById(id));
        return testExecution.until;
    },
    async testRun({ id }, _args) {
        const [runId, _] = id.split('/');
        return {
            __typename: 'TestRun',
            id: runId,
        };
    },
    async environment({ id }, _args, { dataSources }) {
        const results = await dataSources.testResults.getById(id)
        const [major, minor, build, patch] = results.browserVersion.split('.')
            .map((str: string) => parseInt(str));
        return {
            __typename: 'TestExecutionEnvironment',
            browser: {
                __typename: 'ChromiumVersion',
                major,
                minor,
                build,
                patch
            }
        };
    },
}

export default resolvers;
