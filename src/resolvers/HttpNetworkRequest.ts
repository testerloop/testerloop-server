import sortArray from '../util/sortArray.js';
import { HttpHeaderOrderBy, HttpNetworkRequestResolvers } from './types/generated.js';

const resolvers: HttpNetworkRequestResolvers = {
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
    httpVersion: ({ httpVersion }) => httpVersion,
    method: ({ method }) => method,
    queryString: ({ queryString }) => queryString,
    url: ({ url }) => url,
};

export default resolvers;
