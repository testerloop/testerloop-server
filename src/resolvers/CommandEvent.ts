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
    previousSnapshot: ({ previousSnapshot }) => previousSnapshot,
    nextSnapshot: ({ nextSnapshot }) => nextSnapshot,
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
        const [runId, _] = id.split('/');
        return {
            __typename: 'TestExecution',
            id,
            testRun: {
                __typename: 'TestRun',
                id: runId
            }
        };
    },
}

export default resolvers;
