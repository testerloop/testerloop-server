import { encodeId } from '../util/id.js';
import { TestExecutionScreenshotResolvers } from './types/generated.js';

const resolvers: TestExecutionScreenshotResolvers = {
    id({ id }) {
        return encodeId('TestExecutionScreenshot', id);
    },
    async at({ id }, _args, { dataSources }) {
        const event = await dataSources.screenshot.getById(id);
        return event.at;
    },
    async url({ id }, _args, { dataSources }) {
        const event = await dataSources.screenshot.getById(id);
        return {
            __typename: 'SignedURL',
            ...event.signedUrl
        };
    },
    async testExecution({ testExecutionId }) {
        const [runId, _] = testExecutionId.split('/');
        return {
            __typename: 'TestExecution',
            id: testExecutionId,
            testRun: {
                __typename: 'TestRun',
                id: runId
            }
        };
    },
};

export default resolvers;
