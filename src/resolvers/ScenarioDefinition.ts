import { ScenarioDefinitionResolvers } from './types/generated.js';

const resolvers: ScenarioDefinitionResolvers = {
    description: ({ description }) => description,
};

export default resolvers;
