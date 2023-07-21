import { StepDefinitionResolvers } from './types/generated.js';

const resolvers: StepDefinitionResolvers = {
    description: ({ description }) => description,
    keyword: ({ keyword }) => keyword,
};

export default resolvers;
