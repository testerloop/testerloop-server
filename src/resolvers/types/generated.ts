import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ConsoleLogEventModel, TestExecutionModel, TestExecutionEventConnectionModel, TestExecutionEventEdgeModel } from './mappers';
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
  /**
   * Represents the opaque Cursor as specified in The Relay Connection Spec.
   *
   * See:
   * - https://graphql.org/learn/pagination/
   * - https://relay.dev/graphql/connections.htm#sec-Cursor
   */
  Cursor: string;
  /** Represents a DateTime in ISO8601 format. */
  DateTime: Date;
};

export type ConsoleEvent = {
  readonly at: Scalars['DateTime'];
  readonly testExecution: TestExecution;
};

export type ConsoleLogEvent = ConsoleEvent & Event & InstantaneousEvent & TestExecutionEvent & {
  readonly __typename?: 'ConsoleLogEvent';
  readonly at: Scalars['DateTime'];
  readonly logLevel: ConsoleLogLevel;
  readonly message: Scalars['String'];
  readonly testExecution: TestExecution;
};

/**
 * Represents the severity of the log, as according to the specification:
 *
 * See:
 * - https://console.spec.whatwg.org/#loglevel-severity
 */
export enum ConsoleLogLevel {
  Error = 'ERROR',
  Info = 'INFO',
  Log = 'LOG',
  Warn = 'WARN'
}

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

/**
 * The PageInfo type as specified in The Relay Connection Spec.
 *
 * See:
 * - https://graphql.org/learn/pagination/
 * - https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo
 */
export type PageInfo = {
  readonly __typename?: 'PageInfo';
  readonly endCursor: Maybe<Scalars['Cursor']>;
  readonly hasNextPage: Scalars['Boolean'];
  readonly hasPreviousPage: Scalars['Boolean'];
  readonly startCursor: Maybe<Scalars['Cursor']>;
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
  readonly events: TestExecutionEventConnection;
  readonly id: Scalars['ID'];
  readonly until: Scalars['DateTime'];
};


export type TestExecutionEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type TestExecutionEvent = {
  readonly at: Scalars['DateTime'];
  readonly testExecution: TestExecution;
};

/**
 * Represents the connection to TestExecutionEvents
 *
 * See:
 * - https://relay.dev/graphql/connections.htm#sec-Connection-Types
 */
export type TestExecutionEventConnection = {
  readonly __typename?: 'TestExecutionEventConnection';
  readonly edges: ReadonlyArray<TestExecutionEventEdge>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars['Int'];
};

/**
 * Represents and Edge to the TestExecution Node.
 *
 * See:
 * - https://relay.dev/graphql/connections.htm#sec-Edge-Types
 */
export type TestExecutionEventEdge = {
  readonly __typename?: 'TestExecutionEventEdge';
  readonly cursor: Scalars['Cursor'];
  readonly node: TestExecutionEvent;
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
  ConsoleEvent: ResolversTypes['ConsoleLogEvent'];
  ConsoleLogEvent: ResolverTypeWrapper<ConsoleLogEventModel>;
  ConsoleLogLevel: ConsoleLogLevel;
  Cursor: ResolverTypeWrapper<Scalars['Cursor']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Event: ResolversTypes['ConsoleLogEvent'] | ResolversTypes['TestExecution'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  InstantaneousEvent: ResolversTypes['ConsoleLogEvent'];
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntervalEvent: ResolversTypes['TestExecution'];
  Node: ResolversTypes['TestExecution'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<unknown>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TestExecution: ResolverTypeWrapper<TestExecutionModel>;
  TestExecutionEvent: ResolversTypes['ConsoleLogEvent'];
  TestExecutionEventConnection: ResolverTypeWrapper<TestExecutionEventConnectionModel>;
  TestExecutionEventEdge: ResolverTypeWrapper<TestExecutionEventEdgeModel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  ConsoleEvent: ResolversParentTypes['ConsoleLogEvent'];
  ConsoleLogEvent: ConsoleLogEventModel;
  Cursor: Scalars['Cursor'];
  DateTime: Scalars['DateTime'];
  Event: ResolversParentTypes['ConsoleLogEvent'] | ResolversParentTypes['TestExecution'];
  ID: Scalars['ID'];
  InstantaneousEvent: ResolversParentTypes['ConsoleLogEvent'];
  Int: Scalars['Int'];
  IntervalEvent: ResolversParentTypes['TestExecution'];
  Node: ResolversParentTypes['TestExecution'];
  PageInfo: PageInfo;
  Query: unknown;
  String: Scalars['String'];
  TestExecution: TestExecutionModel;
  TestExecutionEvent: ResolversParentTypes['ConsoleLogEvent'];
  TestExecutionEventConnection: TestExecutionEventConnectionModel;
  TestExecutionEventEdge: TestExecutionEventEdgeModel;
};

export type ConsoleEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ConsoleEvent'] = ResolversParentTypes['ConsoleEvent']> = {
  __resolveType: TypeResolveFn<'ConsoleLogEvent', ParentType, ContextType>;
};

export type ConsoleLogEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ConsoleLogEvent'] = ResolversParentTypes['ConsoleLogEvent']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  logLevel: Resolver<ResolversTypes['ConsoleLogLevel'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  testExecution: Resolver<ResolversTypes['TestExecution'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface CursorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cursor'], any> {
  name: 'Cursor';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  __resolveType: TypeResolveFn<'ConsoleLogEvent' | 'TestExecution', ParentType, ContextType>;
};

export type InstantaneousEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['InstantaneousEvent'] = ResolversParentTypes['InstantaneousEvent']> = {
  __resolveType: TypeResolveFn<'ConsoleLogEvent', ParentType, ContextType>;
};

export type IntervalEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['IntervalEvent'] = ResolversParentTypes['IntervalEvent']> = {
  __resolveType: TypeResolveFn<'TestExecution', ParentType, ContextType>;
};

export type NodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'TestExecution', ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  hasNextPage: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  node: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  test: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  testExecution: Resolver<Maybe<ResolversTypes['TestExecution']>, ParentType, ContextType, RequireFields<QueryTestExecutionArgs, 'id'>>;
};

export type TestExecutionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecution'] = ResolversParentTypes['TestExecution']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  events: Resolver<ResolversTypes['TestExecutionEventConnection'], ParentType, ContextType, Partial<TestExecutionEventsArgs>>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  until: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestExecutionEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecutionEvent'] = ResolversParentTypes['TestExecutionEvent']> = {
  __resolveType: TypeResolveFn<'ConsoleLogEvent', ParentType, ContextType>;
};

export type TestExecutionEventConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecutionEventConnection'] = ResolversParentTypes['TestExecutionEventConnection']> = {
  edges: Resolver<ReadonlyArray<ResolversTypes['TestExecutionEventEdge']>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestExecutionEventEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecutionEventEdge'] = ResolversParentTypes['TestExecutionEventEdge']> = {
  cursor: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  node: Resolver<ResolversTypes['TestExecutionEvent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  ConsoleEvent: ConsoleEventResolvers<ContextType>;
  ConsoleLogEvent: ConsoleLogEventResolvers<ContextType>;
  Cursor: GraphQLScalarType;
  DateTime: GraphQLScalarType;
  Event: EventResolvers<ContextType>;
  InstantaneousEvent: InstantaneousEventResolvers<ContextType>;
  IntervalEvent: IntervalEventResolvers<ContextType>;
  Node: NodeResolvers<ContextType>;
  PageInfo: PageInfoResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  TestExecution: TestExecutionResolvers<ContextType>;
  TestExecutionEvent: TestExecutionEventResolvers<ContextType>;
  TestExecutionEventConnection: TestExecutionEventConnectionResolvers<ContextType>;
  TestExecutionEventEdge: TestExecutionEventEdgeResolvers<ContextType>;
};

