import { createDataSources, DataSources } from './datasources/index.js';

export type Context = {
    dataSources: DataSources;
};

export const createContext = async (): Promise<Context> => {
    let dataSources: DataSources | null = null;
    const context = {
        get dataSources() {
            if (dataSources === null)
                throw new Error(
                    'DataSources are not available during DataSource initialization.',
                );
            return dataSources;
        },
    };
    dataSources = createDataSources(context);
    return context;
};
