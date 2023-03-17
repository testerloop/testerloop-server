import {  HttpNetworkResponseResolvers } from './types/generated.js';

const resolvers: HttpNetworkResponseResolvers = {
    body: ({ body }) => body,
    cookies: ({ cookies }) => cookies,
    headers: ({ headers }) => headers,
    redirectURL: ({ redirectURL }) => redirectURL,
    status: ({ status }) => status,
    statusText: ({ statusText }) => statusText,
    transferSize: ({ transferSize }) => transferSize,
};

export default resolvers;
