import { Order } from "../resolvers/types/generated.js";

const sortArray = (values: Record<string,any>[], key: string, order: Order) => values.sort((a, b) => {
    const orderVal = order === Order.Asc ? 1 : -1;
    const aValue = a[key].toLowerCase();
    const bValue = b[key].toLowerCase();
    if (aValue < bValue) {
      return -1 * orderVal;
    }
    if (aValue > bValue) {
      return 1 * orderVal;
    }
    return 0;
  });


export default sortArray;
