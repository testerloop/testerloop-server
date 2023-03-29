import sortArray from '../util/sortArray.js';
import {  HttpHeaderOrderBy, HttpNetworkResponseResolvers } from './types/generated.js';

const resolvers: HttpNetworkResponseResolvers = {
    body: ({ body }) => body,
    cookies: ({ cookies }) => cookies,
    headers: ({ headers }, { order }) => {
        if(order.by === HttpHeaderOrderBy.Wire){
            return headers;
        }
        const values = [...headers.values];
        sortArray(values, 'key', order.direction)

        return {...headers, values}
    },
    redirectURL: ({ redirectURL }) => redirectURL,
    status: ({ status }) => status,
    statusText: ({ statusText }) => statusText,
    transferSize: ({ transferSize }) => transferSize,
};

export default resolvers;
