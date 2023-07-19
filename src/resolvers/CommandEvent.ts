import { encodeId } from '../util/id.js';

import {
    CommandEventResolvers,
    CommandEventStatus,
} from './types/generated.js';

const resolvers: CommandEventResolvers = {
    async id({ id }) {
        return encodeId('CommandEvent', id);
    },
    at: ({ at }) => at,
    until: ({ until }) => until,
    name: ({ name }) => name,
    description: ({ message }) => message,
    async previousSnapshot({ id, at, snapshotID }, _args, { dataSources }) {
        const [runId, requestId, _] = id.split('/');
        const snapshot = await dataSources.snapshot.getById(
            `${runId}/${requestId}/snapshot/${snapshotID}`,
        );
        if (!snapshot) {
            return null;
        }
        return {
            __typename: 'TestExecutionSnapshot' as const,
            testExecutionId: `${runId}/${requestId}`,
            at,
            dom: snapshot.beforeBody,
        };
    },
    async nextSnapshot({ id, until, snapshotID }, _args, { dataSources }) {
        const [runId, requestId, _] = id.split('/');
        const snapshot = await dataSources.snapshot.getById(
            `${runId}/${requestId}/snapshot/${snapshotID}`,
        );
        if (!snapshot) {
            return null;
        }
        return {
            __typename: 'TestExecutionSnapshot' as const,
            testExecutionId: `${runId}/${requestId}`,
            at: until,
            dom: snapshot.afterBody,
        };
    },
    status({ state }) {
        switch (state) {
            case 'failed':
                return CommandEventStatus.Failed;
            case 'passed':
                return CommandEventStatus.Success;
            default:
                throw new Error(`State ${state} is not a valid state`);
        }
    },
    async error({ id, err }, _args, { dataSources }) {
        if (!err) {
            return null;
        }

        const { codeFrame } = err;
        const { relativeFile, line, column } = codeFrame;

        const [runId, _] = id.split('/');

        const cicd = await dataSources.testCodeRevision.getById(runId);

        return {
            __typename: 'CommandEventError',
            type: err.name,
            message: err.message,
            stackTrace: err.stack,
            location: {
                __typename: 'GitHubRevisionFileLineColumn',
                line: {
                    __typename: 'GitHubRevisionFileLine',
                    file: {
                        __typename: 'GitHubRevisionFile',
                        path: relativeFile,
                        revision: {
                            __typename: 'GitHubRevision',
                            repository: cicd.repository,
                            branch: cicd.branch,
                            committer: cicd.committer,
                            author: cicd.author,
                            url: cicd.url,
                            hash: cicd.hash,
                            shortHash: cicd.shortHash,
                        },
                    },
                    url: [
                        cicd.serverUrl,
                        cicd.repository.name,
                        'blob',
                        cicd.refName,
                        relativeFile,
                        `?#L${line}`,
                    ].join('/'),
                    line,
                },
                column,
            },
        };
    },
    async testExecution({ id }, _args) {
        const [runId, requestId, _] = id.split('/');
        const testExecutionId = `${runId}/${requestId}`;
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
