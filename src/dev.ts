import { startStandaloneServer } from '@apollo/server/standalone';
import config from './config.js';
import server from './server.js';

const { url } = await startStandaloneServer(
    server,
    {
        async context() {
            return {};
        },
        listen: {
            port: config.PORT,
        },
    },
);
console.log(`Server started at ${url}`);
