import sortArray from '../util/sortArray.js';
import { HttpHeaderOrderBy, HttpHeadersResolvers, OrderDirection } from './types/generated.js';

const resolvers: HttpHeadersResolvers = {
    size: ({ size }) => size,
    values: ({ values }, { order }) => {
        if(order.by === HttpHeaderOrderBy.Wire){
            if(order.direction === OrderDirection.Ascending){
                return values;
            }
            return [...values].reverse()
        }
        
        return sortArray([...values], 'key', order.direction)
    },
};

export default resolvers;
