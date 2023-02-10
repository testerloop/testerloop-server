import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TestExecutionModel } from './mappers';
import { Context } from '../../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents a DateTime in ISO8601 format. */
  DateTime: Date;
};

export type Event = {
  readonly at: Scalars['DateTime'];
};

export type InstantaneousEvent = {
  readonly at: Scalars['DateTime'];
};

export type IntervalEvent = {
  readonly at: Scalars['DateTime'];
  readonly until: Scalars['DateTime'];
};

/**
 * Represents a Node according to the Global Object Identification spec.
 *
 * See https://graphql.org/learn/global-object-identification/
 */
export type Node = {
  readonly id: Scalars['ID'];
};

export type Query = {
  readonly __typename?: 'Query';
  readonly node: Maybe<Node>;
  readonly test: Scalars['Boolean'];
  readonly testExecution: Maybe<TestExecution>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryTestExecutionArgs = {
  id: Scalars['ID'];
};

export type TestExecution = Event & IntervalEvent & Node & {
  readonly __typename?: 'TestExecution';
  readonly at: Scalars['DateTime'];
  readonly id: Scalars['ID'];
  readonly until: Scalars['DateTime'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info?: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info?: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Event: ResolversTypes['TestExecution'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  InstantaneousEvent: never;
  IntervalEvent: ResolversTypes['TestExecution'];
  Node: ResolversTypes['TestExecution'];
  Query: ResolverTypeWrapper<unknown>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TestExecution: ResolverTypeWrapper<TestExecutionModel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  Event: ResolversParentTypes['TestExecution'];
  ID: Scalars['ID'];
  InstantaneousEvent: never;
  IntervalEvent: ResolversParentTypes['TestExecution'];
  Node: ResolversParentTypes['TestExecution'];
  Query: unknown;
  String: Scalars['String'];
  TestExecution: TestExecutionModel;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  __resolveType: TypeResolveFn<'TestExecution', ParentType, ContextType>;
};

export type InstantaneousEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['InstantaneousEvent'] = ResolversParentTypes['InstantaneousEvent']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
};

export type IntervalEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['IntervalEvent'] = ResolversParentTypes['IntervalEvent']> = {
  __resolveType: TypeResolveFn<'TestExecution', ParentType, ContextType>;
};

export type NodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'TestExecution', ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  node: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  test: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  testExecution: Resolver<Maybe<ResolversTypes['TestExecution']>, ParentType, ContextType, RequireFields<QueryTestExecutionArgs, 'id'>>;
};

export type TestExecutionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecution'] = ResolversParentTypes['TestExecution']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  until: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  DateTime: GraphQLScalarType;
  Event: EventResolvers<ContextType>;
  InstantaneousEvent: InstantaneousEventResolvers<ContextType>;
  IntervalEvent: IntervalEventResolvers<ContextType>;
  Node: NodeResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  TestExecution: TestExecutionResolvers<ContextType>;
};

