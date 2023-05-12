import  {StackTraceResolvers} from './types/generated';



const resolvers: StackTraceResolvers = {
  callFrames: (parent) => parent.callFrames,
};

export default resolvers
