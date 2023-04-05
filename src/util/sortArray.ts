import { OrderDirection } from "../resolvers/types/generated.js";

const sortArray = <K extends string, T extends Record<K, string>>(values: T[], key: K, order: OrderDirection) => values.sort((a, b) => {
    const orderVal = order === OrderDirection.Ascending ? 1 : -1;
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
