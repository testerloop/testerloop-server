import sortArray from '../util/sortArray.js';
import { HttpHeaderOrderBy, HttpHeadersResolvers, KeyValuePair } from './types/generated.js';

const resolvers: HttpHeadersResolvers = {
    size: ({ size }) => size,
    values: ({ values }, { order }) => {
        if(order.by === HttpHeaderOrderBy.Wire){
            return values;
        }
        
        return sortArray([...values], 'key', order.direction) as KeyValuePair[]
    },
};

export default resolvers;
