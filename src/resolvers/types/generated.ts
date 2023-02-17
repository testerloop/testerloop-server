import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ConsoleLogEventModel, NetworkEventModel, TestExecutionModel, TestExecutionEventConnectionModel, TestExecutionEventEdgeModel } from './mappers';
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

export type Chunk = {
  readonly __typename?: 'Chunk';
  readonly bytes: Maybe<Scalars['Int']>;
  readonly ts: Maybe<Scalars['Float']>;
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

export type Content = {
  readonly __typename?: 'Content';
  readonly _comment: Maybe<Scalars['String']>;
  readonly compression: Maybe<Scalars['Int']>;
  readonly encoding: Maybe<Scalars['String']>;
  readonly mimeType: Scalars['String'];
  readonly size: Scalars['Int'];
  readonly text: Maybe<Scalars['String']>;
};

export type Cookie = {
  readonly __typename?: 'Cookie';
  readonly _comment: Maybe<Scalars['String']>;
  readonly domain: Maybe<Scalars['String']>;
  readonly expires: Maybe<Scalars['String']>;
  readonly httpOnly: Maybe<Scalars['Boolean']>;
  readonly name: Scalars['String'];
  readonly path: Maybe<Scalars['String']>;
  readonly secure: Maybe<Scalars['Boolean']>;
  readonly value: Scalars['String'];
};

export type Creator = {
  readonly __typename?: 'Creator';
  readonly comment: Maybe<Scalars['String']>;
  readonly name: Scalars['String'];
  readonly version: Scalars['String'];
};

export type Entry = {
  readonly __typename?: 'Entry';
  readonly _chunks: ReadonlyArray<Chunk>;
  readonly _initialPriority: Maybe<Scalars['String']>;
  readonly _initiator: Maybe<Scalars['String']>;
  readonly _priority: Maybe<Scalars['String']>;
  readonly _requestId: Maybe<Scalars['String']>;
  readonly _requestTime: Maybe<Scalars['Float']>;
  readonly request: Request;
  readonly response: Response;
  readonly serverIPAddress: Maybe<Scalars['String']>;
  readonly startedDateTime: Scalars['String'];
  readonly time: Scalars['Float'];
  readonly timings: Timings;
};

export type Event = {
  readonly at: Scalars['DateTime'];
};

export type Header = {
  readonly __typename?: 'Header';
  readonly name: Scalars['String'];
  readonly value: Scalars['String'];
};

export type InstantaneousEvent = {
  readonly at: Scalars['DateTime'];
};

export type IntervalEvent = {
  readonly at: Scalars['DateTime'];
  readonly until: Scalars['DateTime'];
};

export type Log = {
  readonly __typename?: 'Log';
  readonly creator: Creator;
  readonly entries: ReadonlyArray<Entry>;
  readonly pages: ReadonlyArray<Page>;
  readonly version: Scalars['String'];
};

export type NetworkEvent = {
  readonly __typename?: 'NetworkEvent';
  readonly id: Scalars['ID'];
  readonly log: Log;
  readonly testExecution: TestExecution;
};

/**
 * Represents a Node according to the Global Object Identification spec.
 *
 * See https://graphql.org/learn/global-object-identification/
 */
export type Node = {
  readonly id: Scalars['ID'];
};

export type Page = {
  readonly __typename?: 'Page';
  readonly id: Scalars['String'];
  readonly pageTimings: PageTimings;
  readonly startedDateTime: Scalars['String'];
  readonly title: Scalars['String'];
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

export type PageTimings = {
  readonly __typename?: 'PageTimings';
  readonly onContentLoad: Maybe<Scalars['Float']>;
  readonly onLoad: Maybe<Scalars['Float']>;
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

export type QueryString = {
  readonly __typename?: 'QueryString';
  readonly name: Scalars['String'];
  readonly value: Scalars['String'];
};

export type Request = {
  readonly __typename?: 'Request';
  readonly _comment: Maybe<Scalars['String']>;
  readonly bodySize: Scalars['Int'];
  readonly cookies: ReadonlyArray<Cookie>;
  readonly headers: ReadonlyArray<Header>;
  readonly headersSize: Scalars['Int'];
  readonly httpVersion: Scalars['String'];
  readonly method: Scalars['String'];
  readonly queryString: ReadonlyArray<QueryString>;
  readonly url: Scalars['String'];
};

export type Response = {
  readonly __typename?: 'Response';
  readonly _comment: Maybe<Scalars['String']>;
  readonly _transferSize: Maybe<Scalars['Int']>;
  readonly bodySize: Scalars['Int'];
  readonly content: Content;
  readonly cookies: ReadonlyArray<Cookie>;
  readonly headers: ReadonlyArray<Header>;
  readonly headersSize: Scalars['Int'];
  readonly httpVersion: Scalars['String'];
  readonly redirectURL: Maybe<Scalars['String']>;
  readonly status: Scalars['Int'];
  readonly statusText: Scalars['String'];
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
  type: TestExecutionEventType;
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

export type Timings = {
  readonly __typename?: 'Timings';
  readonly _queued: Maybe<Scalars['Float']>;
  readonly blocked: Maybe<Scalars['Float']>;
  readonly connect: Maybe<Scalars['Float']>;
  readonly dns: Maybe<Scalars['Float']>;
  readonly receive: Maybe<Scalars['Float']>;
  readonly send: Maybe<Scalars['Float']>;
  readonly ssl: Maybe<Scalars['Float']>;
  readonly wait: Maybe<Scalars['Float']>;
};
export enum TestExecutionEventType {
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
  Chunk: ResolverTypeWrapper<Chunk>;
  ConsoleEvent: ResolversTypes['ConsoleLogEvent'];
  ConsoleLogEvent: ResolverTypeWrapper<ConsoleLogEventModel>;
  ConsoleLogLevel: ConsoleLogLevel;
  Content: ResolverTypeWrapper<Content>;
  Cookie: ResolverTypeWrapper<Cookie>;
  Creator: ResolverTypeWrapper<Creator>;
  Cursor: ResolverTypeWrapper<Scalars['Cursor']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Entry: ResolverTypeWrapper<Entry>;
  Event: ResolversTypes['ConsoleLogEvent'] | ResolversTypes['TestExecution'];
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Header: ResolverTypeWrapper<Header>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  InstantaneousEvent: ResolversTypes['ConsoleLogEvent'];
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntervalEvent: ResolversTypes['TestExecution'];
  Log: ResolverTypeWrapper<Log>;
  NetworkEvent: ResolverTypeWrapper<NetworkEventModel>;
  Node: ResolversTypes['TestExecution'];
  Page: ResolverTypeWrapper<Page>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PageTimings: ResolverTypeWrapper<PageTimings>;
  Query: ResolverTypeWrapper<unknown>;
  QueryString: ResolverTypeWrapper<QueryString>;
  Request: ResolverTypeWrapper<Request>;
  Response: ResolverTypeWrapper<Response>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TestExecution: ResolverTypeWrapper<TestExecutionModel>;
  TestExecutionEvent: ResolversTypes['ConsoleLogEvent'];
  TestExecutionEventConnection: ResolverTypeWrapper<TestExecutionEventConnectionModel>;
  TestExecutionEventEdge: ResolverTypeWrapper<TestExecutionEventEdgeModel>;
  Timings: ResolverTypeWrapper<Timings>;
  TestExecutionEventType: TestExecutionEventType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Chunk: Chunk;
  ConsoleEvent: ResolversParentTypes['ConsoleLogEvent'];
  ConsoleLogEvent: ConsoleLogEventModel;
  Content: Content;
  Cookie: Cookie;
  Creator: Creator;
  Cursor: Scalars['Cursor'];
  DateTime: Scalars['DateTime'];
  Entry: Entry;
  Event: ResolversParentTypes['ConsoleLogEvent'] | ResolversParentTypes['TestExecution'];
  Float: Scalars['Float'];
  Header: Header;
  ID: Scalars['ID'];
  InstantaneousEvent: ResolversParentTypes['ConsoleLogEvent'];
  Int: Scalars['Int'];
  IntervalEvent: ResolversParentTypes['TestExecution'];
  Log: Log;
  NetworkEvent: NetworkEventModel;
  Node: ResolversParentTypes['TestExecution'];
  Page: Page;
  PageInfo: PageInfo;
  PageTimings: PageTimings;
  Query: unknown;
  QueryString: QueryString;
  Request: Request;
  Response: Response;
  String: Scalars['String'];
  TestExecution: TestExecutionModel;
  TestExecutionEvent: ResolversParentTypes['ConsoleLogEvent'];
  TestExecutionEventConnection: TestExecutionEventConnectionModel;
  TestExecutionEventEdge: TestExecutionEventEdgeModel;
  Timings: Timings;
};

export type ChunkResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Chunk'] = ResolversParentTypes['Chunk']> = {
  bytes: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ts: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
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

export type ContentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Content'] = ResolversParentTypes['Content']> = {
  _comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  compression: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  encoding: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mimeType: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CookieResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Cookie'] = ResolversParentTypes['Cookie']> = {
  _comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  domain: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expires: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  httpOnly: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  secure: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Creator'] = ResolversParentTypes['Creator']> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface CursorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cursor'], any> {
  name: 'Cursor';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EntryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Entry'] = ResolversParentTypes['Entry']> = {
  _chunks: Resolver<ReadonlyArray<ResolversTypes['Chunk']>, ParentType, ContextType>;
  _initialPriority: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _initiator: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _priority: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _requestId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _requestTime: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  request: Resolver<ResolversTypes['Request'], ParentType, ContextType>;
  response: Resolver<ResolversTypes['Response'], ParentType, ContextType>;
  serverIPAddress: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startedDateTime: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  timings: Resolver<ResolversTypes['Timings'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  __resolveType: TypeResolveFn<'ConsoleLogEvent' | 'TestExecution', ParentType, ContextType>;
};

export type HeaderResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Header'] = ResolversParentTypes['Header']> = {
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InstantaneousEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['InstantaneousEvent'] = ResolversParentTypes['InstantaneousEvent']> = {
  __resolveType: TypeResolveFn<'ConsoleLogEvent', ParentType, ContextType>;
};

export type IntervalEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['IntervalEvent'] = ResolversParentTypes['IntervalEvent']> = {
  __resolveType: TypeResolveFn<'TestExecution', ParentType, ContextType>;
};

export type LogResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Log'] = ResolversParentTypes['Log']> = {
  creator: Resolver<ResolversTypes['Creator'], ParentType, ContextType>;
  entries: Resolver<ReadonlyArray<ResolversTypes['Entry']>, ParentType, ContextType>;
  pages: Resolver<ReadonlyArray<ResolversTypes['Page']>, ParentType, ContextType>;
  version: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NetworkEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NetworkEvent'] = ResolversParentTypes['NetworkEvent']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  log: Resolver<ResolversTypes['Log'], ParentType, ContextType>;
  testExecution: Resolver<ResolversTypes['TestExecution'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'TestExecution', ParentType, ContextType>;
};

export type PageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Page'] = ResolversParentTypes['Page']> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pageTimings: Resolver<ResolversTypes['PageTimings'], ParentType, ContextType>;
  startedDateTime: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  hasNextPage: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageTimingsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageTimings'] = ResolversParentTypes['PageTimings']> = {
  onContentLoad: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  onLoad: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  node: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  test: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  testExecution: Resolver<Maybe<ResolversTypes['TestExecution']>, ParentType, ContextType, RequireFields<QueryTestExecutionArgs, 'id'>>;
};

export type QueryStringResolvers<ContextType = Context, ParentType extends ResolversParentTypes['QueryString'] = ResolversParentTypes['QueryString']> = {
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RequestResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Request'] = ResolversParentTypes['Request']> = {
  _comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bodySize: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cookies: Resolver<ReadonlyArray<ResolversTypes['Cookie']>, ParentType, ContextType>;
  headers: Resolver<ReadonlyArray<ResolversTypes['Header']>, ParentType, ContextType>;
  headersSize: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  httpVersion: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  method: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  queryString: Resolver<ReadonlyArray<ResolversTypes['QueryString']>, ParentType, ContextType>;
  url: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  _comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _transferSize: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  bodySize: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  content: Resolver<ResolversTypes['Content'], ParentType, ContextType>;
  cookies: Resolver<ReadonlyArray<ResolversTypes['Cookie']>, ParentType, ContextType>;
  headers: Resolver<ReadonlyArray<ResolversTypes['Header']>, ParentType, ContextType>;
  headersSize: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  httpVersion: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  redirectURL: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  statusText: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestExecutionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecution'] = ResolversParentTypes['TestExecution']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  events: Resolver<ResolversTypes['TestExecutionEventConnection'], ParentType, ContextType, RequireFields<TestExecutionEventsArgs, 'type'>>;
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

export type TimingsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Timings'] = ResolversParentTypes['Timings']> = {
  _queued: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  blocked: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  connect: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  dns: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  receive: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  send: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ssl: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  wait: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Chunk: ChunkResolvers<ContextType>;
  ConsoleEvent: ConsoleEventResolvers<ContextType>;
  ConsoleLogEvent: ConsoleLogEventResolvers<ContextType>;
  Content: ContentResolvers<ContextType>;
  Cookie: CookieResolvers<ContextType>;
  Creator: CreatorResolvers<ContextType>;
  Cursor: GraphQLScalarType;
  DateTime: GraphQLScalarType;
  Entry: EntryResolvers<ContextType>;
  Event: EventResolvers<ContextType>;
  Header: HeaderResolvers<ContextType>;
  InstantaneousEvent: InstantaneousEventResolvers<ContextType>;
  IntervalEvent: IntervalEventResolvers<ContextType>;
  Log: LogResolvers<ContextType>;
  NetworkEvent: NetworkEventResolvers<ContextType>;
  Node: NodeResolvers<ContextType>;
  Page: PageResolvers<ContextType>;
  PageInfo: PageInfoResolvers<ContextType>;
  PageTimings: PageTimingsResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  QueryString: QueryStringResolvers<ContextType>;
  Request: RequestResolvers<ContextType>;
  Response: ResponseResolvers<ContextType>;
  TestExecution: TestExecutionResolvers<ContextType>;
  TestExecutionEvent: TestExecutionEventResolvers<ContextType>;
  TestExecutionEventConnection: TestExecutionEventConnectionResolvers<ContextType>;
  TestExecutionEventEdge: TestExecutionEventEdgeResolvers<ContextType>;
  Timings: TimingsResolvers<ContextType>;
};

