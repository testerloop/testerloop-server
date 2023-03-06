import { HttpNetworkTimingsResolvers } from './types/generated.js';

const resolvers: HttpNetworkTimingsResolvers = {
    blocked: ({ blocked }) => (blocked),
    connect: ({ connect }) => (connect),
    queued: ({ queued }) => (queued),
    receive: ({ receive }) => (receive),
    send: ({ send }) => (send),
    ssl: ({ ssl }) => (ssl),
    wait: ({ wait }) => (wait),
};

export default resolvers;
