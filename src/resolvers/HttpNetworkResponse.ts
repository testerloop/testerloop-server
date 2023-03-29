import sortArray from '../util/sortArray.js';
import {  HttpNetworkResponseResolvers } from './types/generated.js';

const resolvers: HttpNetworkResponseResolvers = {
    body: ({ body }) => body,
    cookies: ({ cookies }) => cookies,
    headers: ({ headers }, { order }) => {
        if(!order){
            return headers;
        }
        const values = [...headers.values];
        sortArray(values, 'key', order)

        return {...headers, values}
    },
    redirectURL: ({ redirectURL }) => redirectURL,
    status: ({ status }) => status,
    statusText: ({ statusText }) => statusText,
    transferSize: ({ transferSize }) => transferSize,
};

export default resolvers;
