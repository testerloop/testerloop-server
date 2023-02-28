import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { CommandChainModel, CommandChainConnectionModel, CommandChainEdgeModel, CommandEventModel, CommandEventConnectionModel, CommandEventEdgeModel, ConsoleLogEventModel, GenericCommandEventModel, TestExecutionModel, TestExecutionEventConnectionModel, TestExecutionEventEdgeModel, StepEventModel } from './mappers';
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

export type CommandChain = Event & IntervalEvent & TestExecutionEvent & {
  readonly __typename?: 'CommandChain';
  readonly at: Scalars['DateTime'];
  readonly commands: CommandEventConnection;
  readonly testExecution: TestExecution;
  readonly until: Scalars['DateTime'];
};

export type CommandChainConnection = {
  readonly __typename?: 'CommandChainConnection';
  readonly edges: ReadonlyArray<CommandChainEdge>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars['Int'];
};

export type CommandChainEdge = {
  readonly __typename?: 'CommandChainEdge';
  readonly cursor: Scalars['Cursor'];
  readonly node: CommandChain;
};

export type CommandEvent = {
  readonly at: Scalars['DateTime'];
  readonly testExecution: TestExecution;
};

export type CommandEventConnection = {
  readonly __typename?: 'CommandEventConnection';
  readonly edges: ReadonlyArray<CommandEventEdge>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars['Int'];
};

export type CommandEventEdge = {
  readonly __typename?: 'CommandEventEdge';
  readonly cursor: Scalars['Cursor'];
  readonly node: CommandEvent;
};

export type ConsoleEvent = {
  readonly at: Scalars['DateTime'];
  readonly testExecution: TestExecution;
};

export type ConsoleEventFilterInput = {
  readonly logLevel?: InputMaybe<ReadonlyArray<ConsoleLogLevel>>;
  readonly logSearch?: InputMaybe<Scalars['String']>;
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

export type GenericCommandEvent = CommandEvent & Event & IntervalEvent & TestExecutionEvent & {
  readonly __typename?: 'GenericCommandEvent';
  readonly at: Scalars['DateTime'];
  readonly testExecution: TestExecution;
  readonly until: Scalars['DateTime'];
};

export enum GherkinStepKeyword {
  And = 'AND',
  But = 'BUT',
  Given = 'GIVEN',
  Then = 'THEN',
  When = 'WHEN'
}

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

export type StepEvent = Event & IntervalEvent & TestExecutionEvent & {
  readonly __typename?: 'StepEvent';
  readonly at: Scalars['DateTime'];
  readonly commandChains: CommandChainConnection;
  readonly description: Scalars['String'];
  readonly keyword: GherkinStepKeyword;
  readonly testExecution: TestExecution;
  readonly until: Scalars['DateTime'];
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
  filter?: InputMaybe<TestExecutionEventFilterInput>;
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

export type TestExecutionEventFilterInput = {
  readonly consoleFilter?: InputMaybe<ConsoleEventFilterInput>;
  readonly type?: InputMaybe<ReadonlyArray<TestExecutionEventType>>;
};

export enum TestExecutionEventType {
  Command = 'COMMAND',
  Console = 'CONSOLE',
  Network = 'NETWORK'
}



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
  CommandChain: ResolverTypeWrapper<CommandChainModel>;
  CommandChainConnection: ResolverTypeWrapper<CommandChainConnectionModel>;
  CommandChainEdge: ResolverTypeWrapper<CommandChainEdgeModel>;
  CommandEvent: ResolverTypeWrapper<CommandEventModel>;
  CommandEventConnection: ResolverTypeWrapper<CommandEventConnectionModel>;
  CommandEventEdge: ResolverTypeWrapper<CommandEventEdgeModel>;
  ConsoleEvent: ResolversTypes['ConsoleLogEvent'];
  ConsoleEventFilterInput: ConsoleEventFilterInput;
  ConsoleLogEvent: ResolverTypeWrapper<ConsoleLogEventModel>;
  ConsoleLogLevel: ConsoleLogLevel;
  Cursor: ResolverTypeWrapper<Scalars['Cursor']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Event: ResolversTypes['CommandChain'] | ResolversTypes['ConsoleLogEvent'] | ResolversTypes['GenericCommandEvent'] | ResolversTypes['StepEvent'] | ResolversTypes['TestExecution'];
  GenericCommandEvent: ResolverTypeWrapper<GenericCommandEventModel>;
  GherkinStepKeyword: GherkinStepKeyword;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  InstantaneousEvent: ResolversTypes['ConsoleLogEvent'];
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntervalEvent: ResolversTypes['CommandChain'] | ResolversTypes['GenericCommandEvent'] | ResolversTypes['StepEvent'] | ResolversTypes['TestExecution'];
  Node: ResolversTypes['TestExecution'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<unknown>;
  StepEvent: ResolverTypeWrapper<StepEventModel>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TestExecution: ResolverTypeWrapper<TestExecutionModel>;
  TestExecutionEvent: ResolversTypes['CommandChain'] | ResolversTypes['ConsoleLogEvent'] | ResolversTypes['GenericCommandEvent'] | ResolversTypes['StepEvent'];
  TestExecutionEventConnection: ResolverTypeWrapper<TestExecutionEventConnectionModel>;
  TestExecutionEventEdge: ResolverTypeWrapper<TestExecutionEventEdgeModel>;
  TestExecutionEventFilterInput: TestExecutionEventFilterInput;
  TestExecutionEventType: TestExecutionEventType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CommandChain: CommandChainModel;
  CommandChainConnection: CommandChainConnectionModel;
  CommandChainEdge: CommandChainEdgeModel;
  CommandEvent: CommandEventModel;
  CommandEventConnection: CommandEventConnectionModel;
  CommandEventEdge: CommandEventEdgeModel;
  ConsoleEvent: ResolversParentTypes['ConsoleLogEvent'];
  ConsoleEventFilterInput: ConsoleEventFilterInput;
  ConsoleLogEvent: ConsoleLogEventModel;
  Cursor: Scalars['Cursor'];
  DateTime: Scalars['DateTime'];
  Event: ResolversParentTypes['CommandChain'] | ResolversParentTypes['ConsoleLogEvent'] | ResolversParentTypes['GenericCommandEvent'] | ResolversParentTypes['StepEvent'] | ResolversParentTypes['TestExecution'];
  GenericCommandEvent: GenericCommandEventModel;
  ID: Scalars['ID'];
  InstantaneousEvent: ResolversParentTypes['ConsoleLogEvent'];
  Int: Scalars['Int'];
  IntervalEvent: ResolversParentTypes['CommandChain'] | ResolversParentTypes['GenericCommandEvent'] | ResolversParentTypes['StepEvent'] | ResolversParentTypes['TestExecution'];
  Node: ResolversParentTypes['TestExecution'];
  PageInfo: PageInfo;
  Query: unknown;
  StepEvent: StepEventModel;
  String: Scalars['String'];
  TestExecution: TestExecutionModel;
  TestExecutionEvent: ResolversParentTypes['CommandChain'] | ResolversParentTypes['ConsoleLogEvent'] | ResolversParentTypes['GenericCommandEvent'] | ResolversParentTypes['StepEvent'];
  TestExecutionEventConnection: TestExecutionEventConnectionModel;
  TestExecutionEventEdge: TestExecutionEventEdgeModel;
  TestExecutionEventFilterInput: TestExecutionEventFilterInput;
};

export type CommandChainResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommandChain'] = ResolversParentTypes['CommandChain']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  commands: Resolver<ResolversTypes['CommandEventConnection'], ParentType, ContextType>;
  testExecution: Resolver<ResolversTypes['TestExecution'], ParentType, ContextType>;
  until: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommandChainConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommandChainConnection'] = ResolversParentTypes['CommandChainConnection']> = {
  edges: Resolver<ReadonlyArray<ResolversTypes['CommandChainEdge']>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommandChainEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommandChainEdge'] = ResolversParentTypes['CommandChainEdge']> = {
  cursor: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  node: Resolver<ResolversTypes['CommandChain'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommandEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommandEvent'] = ResolversParentTypes['CommandEvent']> = {
  __resolveType: TypeResolveFn<'GenericCommandEvent', ParentType, ContextType>;
};

export type CommandEventConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommandEventConnection'] = ResolversParentTypes['CommandEventConnection']> = {
  edges: Resolver<ReadonlyArray<ResolversTypes['CommandEventEdge']>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommandEventEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommandEventEdge'] = ResolversParentTypes['CommandEventEdge']> = {
  cursor: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  node: Resolver<ResolversTypes['CommandEvent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  __resolveType: TypeResolveFn<'CommandChain' | 'ConsoleLogEvent' | 'GenericCommandEvent' | 'StepEvent' | 'TestExecution', ParentType, ContextType>;
};

export type GenericCommandEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GenericCommandEvent'] = ResolversParentTypes['GenericCommandEvent']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  testExecution: Resolver<ResolversTypes['TestExecution'], ParentType, ContextType>;
  until: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InstantaneousEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['InstantaneousEvent'] = ResolversParentTypes['InstantaneousEvent']> = {
  __resolveType: TypeResolveFn<'ConsoleLogEvent', ParentType, ContextType>;
};

export type IntervalEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['IntervalEvent'] = ResolversParentTypes['IntervalEvent']> = {
  __resolveType: TypeResolveFn<'CommandChain' | 'GenericCommandEvent' | 'StepEvent' | 'TestExecution', ParentType, ContextType>;
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

export type StepEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StepEvent'] = ResolversParentTypes['StepEvent']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  commandChains: Resolver<ResolversTypes['CommandChainConnection'], ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  keyword: Resolver<ResolversTypes['GherkinStepKeyword'], ParentType, ContextType>;
  testExecution: Resolver<ResolversTypes['TestExecution'], ParentType, ContextType>;
  until: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestExecutionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecution'] = ResolversParentTypes['TestExecution']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  events: Resolver<ResolversTypes['TestExecutionEventConnection'], ParentType, ContextType, Partial<TestExecutionEventsArgs>>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  until: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestExecutionEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecutionEvent'] = ResolversParentTypes['TestExecutionEvent']> = {
  __resolveType: TypeResolveFn<'CommandChain' | 'ConsoleLogEvent' | 'GenericCommandEvent' | 'StepEvent', ParentType, ContextType>;
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
  CommandChain: CommandChainResolvers<ContextType>;
  CommandChainConnection: CommandChainConnectionResolvers<ContextType>;
  CommandChainEdge: CommandChainEdgeResolvers<ContextType>;
  CommandEvent: CommandEventResolvers<ContextType>;
  CommandEventConnection: CommandEventConnectionResolvers<ContextType>;
  CommandEventEdge: CommandEventEdgeResolvers<ContextType>;
  ConsoleEvent: ConsoleEventResolvers<ContextType>;
  ConsoleLogEvent: ConsoleLogEventResolvers<ContextType>;
  Cursor: GraphQLScalarType;
  DateTime: GraphQLScalarType;
  Event: EventResolvers<ContextType>;
  GenericCommandEvent: GenericCommandEventResolvers<ContextType>;
  InstantaneousEvent: InstantaneousEventResolvers<ContextType>;
  IntervalEvent: IntervalEventResolvers<ContextType>;
  Node: NodeResolvers<ContextType>;
  PageInfo: PageInfoResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  StepEvent: StepEventResolvers<ContextType>;
  TestExecution: TestExecutionResolvers<ContextType>;
  TestExecutionEvent: TestExecutionEventResolvers<ContextType>;
  TestExecutionEventConnection: TestExecutionEventConnectionResolvers<ContextType>;
  TestExecutionEventEdge: TestExecutionEventEdgeResolvers<ContextType>;
};

