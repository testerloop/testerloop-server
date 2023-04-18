import { encodeId } from '../util/id.js';
import { CommandEventResolvers, CommandEventStatus } from './types/generated.js';

const resolvers: CommandEventResolvers = {
    async id({ id }) {
        return encodeId('CommandEvent', id);
    },
    at: ({ at }) => at,
    until: ({ until }) => until,
    name: ({ name }) => name,
    description: ({ message }) => message,
    async previousSnapshot ({ id, at, snapshotID }, _args, { dataSources }) {
        const [runId, requestId, _] = id.split('/');
        const snapshots = await dataSources.snapshot.getSnapshotsByTestExecutionId(`${runId}/${requestId}`);
        const snapshot = Object.values(snapshots).find((s) => s.snapshotID === snapshotID)
        if(!snapshot){
            throw new Error(`Snapshot with id ${snapshotID} was not found`)
        }
        return { 
            __typename: 'TestExecutionSnapshot' as const,
            id: snapshot._id,
            at,
            dom: snapshot.beforeBody
        }
    },
    async nextSnapshot ({ id, until, snapshotID }, _args, { dataSources }) {
        const [runId, requestId, _] = id.split('/');
        const snapshots = await dataSources.snapshot.getSnapshotsByTestExecutionId(`${runId}/${requestId}`);
        const snapshot = Object.values(snapshots).find((s) => s.snapshotID === snapshotID)
        if(!snapshot){
            throw new Error(`Snapshot with id ${snapshotID} was not found`)
        }
        return { 
            __typename: 'TestExecutionSnapshot' as const,
            id: snapshot._id,
            at: until,
            dom: snapshot.afterBody
        }
    },
    status({ state }) {
        switch(state){
            case 'failed':
                return CommandEventStatus.Failed
            case 'passed':
                return CommandEventStatus.Success
            default:
                throw new Error(`State ${state} is not a valid state`)
        }
    },
    async error({ err }) {
        if(!err){
            return null;
        }
        return {
            __typename: 'CommandEventError',
            type: err.name,
            message: err.message,
            stackTrace: err.stack
        }
    },
    async testExecution({ id }, _args) {
        const [runId, requestId, _] = id.split('/');
        return {
            __typename: 'TestExecution',
            id: `${runId}/${requestId}`,
            testRun: {
                __typename: 'TestRun',
                id: runId
            }
        };
    },
}

export default resolvers;
