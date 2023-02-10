import { createDataSources, DataSources } from './datasources/index.js';

export type Context = {
    dataSources: DataSources;
};

export const createContext = async (): Promise<Context> => ({
    dataSources: createDataSources(),
});
