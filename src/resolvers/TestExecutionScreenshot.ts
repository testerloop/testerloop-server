import { encodeId } from '../util/id.js';
import S3Service from '../S3Service.js';
import config from '../config.js';

import { TestExecutionScreenshotResolvers } from './types/generated.js';

const bucketName = config.AWS_BUCKET_NAME;

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
        const url = await S3Service.getSignedUrl(
            bucketName,
            `${event.fileName}`,
        );

        return {
            __typename: 'SignedURL',
            ...url,
        };
    },
    async testExecution({ testExecutionId }) {
        const [runId, _] = testExecutionId.split('/');
        return {
            __typename: 'TestExecution',
            id: testExecutionId,
            testRun: {
                __typename: 'TestRun',
                id: runId,
            },
        };
    },
};

export default resolvers;
