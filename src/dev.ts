import { startStandaloneServer } from '@apollo/server/standalone';
import config from './config.js';
import { createStandaloneContext } from './context.js';
import server from './server.js';

const { url } = await startStandaloneServer(server, {
    context: createStandaloneContext,
    listen: {
        port: config.PORT,
    },
});
console.log(`Server started at ${url}`);
