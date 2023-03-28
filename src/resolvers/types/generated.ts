import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ConsoleLogEventModel, HttpNetworkEventModel, TestExecutionModel, TestExecutionEventConnectionModel, TestExecutionEventEdgeModel } from './mappers';
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

export type ConsoleEventFilterInput = {
  readonly logLevel?: InputMaybe<ReadonlyArray<ConsoleLogLevel>>;
  readonly logSearch?: InputMaybe<Scalars['String']>;
};

export type ConsoleLogEvent = ConsoleEvent & Event & InstantaneousEvent & TestExecutionEvent & {
  readonly __typename: 'ConsoleLogEvent';
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

export type Cookie = {
  readonly __typename: 'Cookie';
  readonly domain: Maybe<Scalars['String']>;
  readonly expires: Maybe<Scalars['String']>;
  readonly httpOnly: Scalars['Boolean'];
  readonly name: Scalars['String'];
  readonly path: Maybe<Scalars['String']>;
  readonly secure: Scalars['Boolean'];
  readonly value: Scalars['String'];
};

export type Event = {
  readonly at: Scalars['DateTime'];
};

export type HttpBody = {
  readonly data: Scalars['String'];
  readonly encoding: Maybe<Scalars['String']>;
  readonly mimeType: Scalars['String'];
  readonly size: Scalars['Int'];
};

export type HttpHeaders = {
  readonly __typename: 'HttpHeaders';
  readonly size: Scalars['Int'];
  readonly values: ReadonlyArray<KeyValuePair>;
};

export type HttpNetworkEvent = Event & IntervalEvent & NetworkEvent & TestExecutionEvent & {
  readonly __typename: 'HttpNetworkEvent';
  readonly at: Scalars['DateTime'];
  readonly id: Scalars['ID'];
  readonly initiator: HttpNetworkEventInitiator;
  readonly request: HttpNetworkRequest;
  readonly resourceType: Maybe<Scalars['String']>;
  readonly response: HttpNetworkResponse;
  readonly testExecution: TestExecution;
  readonly timings: HttpNetworkTimings;
  readonly until: Scalars['DateTime'];
};

export type HttpNetworkEventInitiator = {
  readonly __typename: 'HttpNetworkEventInitiator';
  readonly lineNumber: Maybe<Scalars['Int']>;
  readonly origin: Maybe<Scalars['String']>;
};

export enum HttpNetworkEventResourceType {
  Document = 'DOCUMENT',
  Font = 'FONT',
  Image = 'IMAGE',
  Other = 'OTHER',
  Script = 'SCRIPT',
  Stylesheet = 'STYLESHEET',
  Xhr = 'XHR'
}

export type HttpNetworkRequest = {
  readonly __typename: 'HttpNetworkRequest';
  readonly body: Maybe<HttpRequestBody>;
  readonly cookies: ReadonlyArray<Maybe<Cookie>>;
  readonly headers: HttpHeaders;
  readonly httpVersion: Scalars['String'];
  readonly method: Scalars['String'];
  readonly queryString: ReadonlyArray<KeyValuePair>;
  readonly url: HttpNetworkRequestUrl;
};

export type HttpNetworkRequestUrl = {
  readonly __typename: 'HttpNetworkRequestUrl';
  readonly nonKeyValueQueryString: Maybe<Scalars['String']>;
  readonly url: Scalars['String'];
};

export type HttpNetworkResponse = {
  readonly __typename: 'HttpNetworkResponse';
  readonly body: HttpResponseBody;
  readonly cookies: ReadonlyArray<Cookie>;
  readonly headers: HttpHeaders;
  readonly redirectURL: Scalars['String'];
  readonly status: Scalars['Int'];
  readonly statusText: Scalars['String'];
  readonly transferSize: Scalars['Int'];
};

export type HttpNetworkTimings = {
  readonly __typename: 'HttpNetworkTimings';
  readonly blocked: NetworkEventTiming;
  readonly connect: NetworkEventTiming;
  readonly queued: NetworkEventTiming;
  readonly receive: NetworkEventTiming;
  readonly send: NetworkEventTiming;
  readonly ssl: NetworkEventTiming;
  readonly wait: NetworkEventTiming;
};

export type HttpRequestBody = HttpBody & {
  readonly __typename: 'HttpRequestBody';
  readonly data: Scalars['String'];
  readonly encoding: Maybe<Scalars['String']>;
  readonly mimeType: Scalars['String'];
  readonly size: Scalars['Int'];
};

export type HttpResponseBody = HttpBody & {
  readonly __typename: 'HttpResponseBody';
  readonly chunks: ReadonlyArray<HttpResponseBodyChunk>;
  readonly data: Scalars['String'];
  readonly encoding: Maybe<Scalars['String']>;
  readonly mimeType: Scalars['String'];
  readonly size: Scalars['Int'];
};

export type HttpResponseBodyChunk = Event & InstantaneousEvent & {
  readonly __typename: 'HttpResponseBodyChunk';
  readonly at: Scalars['DateTime'];
  readonly data: Scalars['String'];
  readonly size: Scalars['Int'];
};

export type InstantaneousEvent = {
  readonly at: Scalars['DateTime'];
};

export type IntervalEvent = {
  readonly at: Scalars['DateTime'];
  readonly until: Scalars['DateTime'];
};

export type KeyValuePair = {
  readonly __typename: 'KeyValuePair';
  readonly key: Scalars['String'];
  readonly value: Scalars['String'];
};

export type NetworkEvent = {
  readonly at: Scalars['DateTime'];
  readonly id: Scalars['ID'];
  readonly until: Scalars['DateTime'];
};

export type NetworkEventFilterInput = {
  readonly progress?: InputMaybe<NetworkEventProgressWithTime>;
  readonly resourceType?: InputMaybe<HttpNetworkEventResourceType>;
  readonly urlSearch?: InputMaybe<Scalars['String']>;
};

export enum NetworkEventProgress {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED'
}

export type NetworkEventProgressWithTime = {
  readonly currentTime: Scalars['DateTime'];
  readonly type: NetworkEventProgress;
};

export type NetworkEventTiming = Event & IntervalEvent & {
  readonly __typename: 'NetworkEventTiming';
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
  readonly __typename: 'PageInfo';
  readonly endCursor: Maybe<Scalars['Cursor']>;
  readonly hasNextPage: Scalars['Boolean'];
  readonly hasPreviousPage: Scalars['Boolean'];
  readonly startCursor: Maybe<Scalars['Cursor']>;
};

export type Query = {
  readonly __typename: 'Query';
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
  readonly __typename: 'TestExecution';
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
  readonly __typename: 'TestExecutionEventConnection';
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
  readonly __typename: 'TestExecutionEventEdge';
  readonly cursor: Scalars['Cursor'];
  readonly node: TestExecutionEvent;
};

export type TestExecutionEventFilterInput = {
  readonly consoleFilter?: InputMaybe<ConsoleEventFilterInput>;
  readonly networkFilter?: InputMaybe<NetworkEventFilterInput>;
  readonly type?: InputMaybe<ReadonlyArray<TestExecutionEventType>>;
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
  ConsoleEvent: ResolversTypes['ConsoleLogEvent'];
  ConsoleEventFilterInput: ConsoleEventFilterInput;
  ConsoleLogEvent: ResolverTypeWrapper<ConsoleLogEventModel>;
  ConsoleLogLevel: ConsoleLogLevel;
  Cookie: ResolverTypeWrapper<Cookie>;
  Cursor: ResolverTypeWrapper<Scalars['Cursor']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Event: ResolversTypes['ConsoleLogEvent'] | ResolversTypes['HttpNetworkEvent'] | ResolversTypes['HttpResponseBodyChunk'] | ResolversTypes['NetworkEventTiming'] | ResolversTypes['TestExecution'];
  HttpBody: ResolversTypes['HttpRequestBody'] | ResolversTypes['HttpResponseBody'];
  HttpHeaders: ResolverTypeWrapper<HttpHeaders>;
  HttpNetworkEvent: ResolverTypeWrapper<HttpNetworkEventModel>;
  HttpNetworkEventInitiator: ResolverTypeWrapper<HttpNetworkEventInitiator>;
  HttpNetworkEventResourceType: HttpNetworkEventResourceType;
  HttpNetworkRequest: ResolverTypeWrapper<HttpNetworkRequest>;
  HttpNetworkRequestUrl: ResolverTypeWrapper<HttpNetworkRequestUrl>;
  HttpNetworkResponse: ResolverTypeWrapper<HttpNetworkResponse>;
  HttpNetworkTimings: ResolverTypeWrapper<HttpNetworkTimings>;
  HttpRequestBody: ResolverTypeWrapper<HttpRequestBody>;
  HttpResponseBody: ResolverTypeWrapper<HttpResponseBody>;
  HttpResponseBodyChunk: ResolverTypeWrapper<HttpResponseBodyChunk>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  InstantaneousEvent: ResolversTypes['ConsoleLogEvent'] | ResolversTypes['HttpResponseBodyChunk'];
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntervalEvent: ResolversTypes['HttpNetworkEvent'] | ResolversTypes['NetworkEventTiming'] | ResolversTypes['TestExecution'];
  KeyValuePair: ResolverTypeWrapper<KeyValuePair>;
  NetworkEvent: ResolversTypes['HttpNetworkEvent'];
  NetworkEventFilterInput: NetworkEventFilterInput;
  NetworkEventProgress: NetworkEventProgress;
  NetworkEventProgressWithTime: NetworkEventProgressWithTime;
  NetworkEventTiming: ResolverTypeWrapper<NetworkEventTiming>;
  Node: ResolversTypes['TestExecution'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<unknown>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TestExecution: ResolverTypeWrapper<TestExecutionModel>;
  TestExecutionEvent: ResolversTypes['ConsoleLogEvent'] | ResolversTypes['HttpNetworkEvent'];
  TestExecutionEventConnection: ResolverTypeWrapper<TestExecutionEventConnectionModel>;
  TestExecutionEventEdge: ResolverTypeWrapper<TestExecutionEventEdgeModel>;
  TestExecutionEventFilterInput: TestExecutionEventFilterInput;
  TestExecutionEventType: TestExecutionEventType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  ConsoleEvent: ResolversParentTypes['ConsoleLogEvent'];
  ConsoleEventFilterInput: ConsoleEventFilterInput;
  ConsoleLogEvent: ConsoleLogEventModel;
  Cookie: Cookie;
  Cursor: Scalars['Cursor'];
  DateTime: Scalars['DateTime'];
  Event: ResolversParentTypes['ConsoleLogEvent'] | ResolversParentTypes['HttpNetworkEvent'] | ResolversParentTypes['HttpResponseBodyChunk'] | ResolversParentTypes['NetworkEventTiming'] | ResolversParentTypes['TestExecution'];
  HttpBody: ResolversParentTypes['HttpRequestBody'] | ResolversParentTypes['HttpResponseBody'];
  HttpHeaders: HttpHeaders;
  HttpNetworkEvent: HttpNetworkEventModel;
  HttpNetworkEventInitiator: HttpNetworkEventInitiator;
  HttpNetworkRequest: HttpNetworkRequest;
  HttpNetworkRequestUrl: HttpNetworkRequestUrl;
  HttpNetworkResponse: HttpNetworkResponse;
  HttpNetworkTimings: HttpNetworkTimings;
  HttpRequestBody: HttpRequestBody;
  HttpResponseBody: HttpResponseBody;
  HttpResponseBodyChunk: HttpResponseBodyChunk;
  ID: Scalars['ID'];
  InstantaneousEvent: ResolversParentTypes['ConsoleLogEvent'] | ResolversParentTypes['HttpResponseBodyChunk'];
  Int: Scalars['Int'];
  IntervalEvent: ResolversParentTypes['HttpNetworkEvent'] | ResolversParentTypes['NetworkEventTiming'] | ResolversParentTypes['TestExecution'];
  KeyValuePair: KeyValuePair;
  NetworkEvent: ResolversParentTypes['HttpNetworkEvent'];
  NetworkEventFilterInput: NetworkEventFilterInput;
  NetworkEventProgressWithTime: NetworkEventProgressWithTime;
  NetworkEventTiming: NetworkEventTiming;
  Node: ResolversParentTypes['TestExecution'];
  PageInfo: PageInfo;
  Query: unknown;
  String: Scalars['String'];
  TestExecution: TestExecutionModel;
  TestExecutionEvent: ResolversParentTypes['ConsoleLogEvent'] | ResolversParentTypes['HttpNetworkEvent'];
  TestExecutionEventConnection: TestExecutionEventConnectionModel;
  TestExecutionEventEdge: TestExecutionEventEdgeModel;
  TestExecutionEventFilterInput: TestExecutionEventFilterInput;
};

export type DeferDirectiveArgs = {
  if: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
};

export type DeferDirectiveResolver<Result, Parent, ContextType = Context, Args = DeferDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type StreamDirectiveArgs = {
  if: Scalars['Boolean'];
  initialCount?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
};

export type StreamDirectiveResolver<Result, Parent, ContextType = Context, Args = StreamDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

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

export type CookieResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Cookie'] = ResolversParentTypes['Cookie']> = {
  domain: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expires: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  httpOnly: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  secure: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface CursorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cursor'], any> {
  name: 'Cursor';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  __resolveType: TypeResolveFn<'ConsoleLogEvent' | 'HttpNetworkEvent' | 'HttpResponseBodyChunk' | 'NetworkEventTiming' | 'TestExecution', ParentType, ContextType>;
};

export type HttpBodyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HttpBody'] = ResolversParentTypes['HttpBody']> = {
  __resolveType: TypeResolveFn<'HttpRequestBody' | 'HttpResponseBody', ParentType, ContextType>;
};

export type HttpHeadersResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HttpHeaders'] = ResolversParentTypes['HttpHeaders']> = {
  size: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  values: Resolver<ReadonlyArray<ResolversTypes['KeyValuePair']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HttpNetworkEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HttpNetworkEvent'] = ResolversParentTypes['HttpNetworkEvent']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  initiator: Resolver<ResolversTypes['HttpNetworkEventInitiator'], ParentType, ContextType>;
  request: Resolver<ResolversTypes['HttpNetworkRequest'], ParentType, ContextType>;
  resourceType: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  response: Resolver<ResolversTypes['HttpNetworkResponse'], ParentType, ContextType>;
  testExecution: Resolver<ResolversTypes['TestExecution'], ParentType, ContextType>;
  timings: Resolver<ResolversTypes['HttpNetworkTimings'], ParentType, ContextType>;
  until: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HttpNetworkEventInitiatorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HttpNetworkEventInitiator'] = ResolversParentTypes['HttpNetworkEventInitiator']> = {
  lineNumber: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  origin: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HttpNetworkRequestResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HttpNetworkRequest'] = ResolversParentTypes['HttpNetworkRequest']> = {
  body: Resolver<Maybe<ResolversTypes['HttpRequestBody']>, ParentType, ContextType>;
  cookies: Resolver<ReadonlyArray<Maybe<ResolversTypes['Cookie']>>, ParentType, ContextType>;
  headers: Resolver<ResolversTypes['HttpHeaders'], ParentType, ContextType>;
  httpVersion: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  method: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  queryString: Resolver<ReadonlyArray<ResolversTypes['KeyValuePair']>, ParentType, ContextType>;
  url: Resolver<ResolversTypes['HttpNetworkRequestUrl'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HttpNetworkRequestUrlResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HttpNetworkRequestUrl'] = ResolversParentTypes['HttpNetworkRequestUrl']> = {
  nonKeyValueQueryString: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HttpNetworkResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HttpNetworkResponse'] = ResolversParentTypes['HttpNetworkResponse']> = {
  body: Resolver<ResolversTypes['HttpResponseBody'], ParentType, ContextType>;
  cookies: Resolver<ReadonlyArray<ResolversTypes['Cookie']>, ParentType, ContextType>;
  headers: Resolver<ResolversTypes['HttpHeaders'], ParentType, ContextType>;
  redirectURL: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  statusText: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transferSize: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HttpNetworkTimingsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HttpNetworkTimings'] = ResolversParentTypes['HttpNetworkTimings']> = {
  blocked: Resolver<ResolversTypes['NetworkEventTiming'], ParentType, ContextType>;
  connect: Resolver<ResolversTypes['NetworkEventTiming'], ParentType, ContextType>;
  queued: Resolver<ResolversTypes['NetworkEventTiming'], ParentType, ContextType>;
  receive: Resolver<ResolversTypes['NetworkEventTiming'], ParentType, ContextType>;
  send: Resolver<ResolversTypes['NetworkEventTiming'], ParentType, ContextType>;
  ssl: Resolver<ResolversTypes['NetworkEventTiming'], ParentType, ContextType>;
  wait: Resolver<ResolversTypes['NetworkEventTiming'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HttpRequestBodyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HttpRequestBody'] = ResolversParentTypes['HttpRequestBody']> = {
  data: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  encoding: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mimeType: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HttpResponseBodyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HttpResponseBody'] = ResolversParentTypes['HttpResponseBody']> = {
  chunks: Resolver<ReadonlyArray<ResolversTypes['HttpResponseBodyChunk']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  encoding: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mimeType: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HttpResponseBodyChunkResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HttpResponseBodyChunk'] = ResolversParentTypes['HttpResponseBodyChunk']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InstantaneousEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['InstantaneousEvent'] = ResolversParentTypes['InstantaneousEvent']> = {
  __resolveType: TypeResolveFn<'ConsoleLogEvent' | 'HttpResponseBodyChunk', ParentType, ContextType>;
};

export type IntervalEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['IntervalEvent'] = ResolversParentTypes['IntervalEvent']> = {
  __resolveType: TypeResolveFn<'HttpNetworkEvent' | 'NetworkEventTiming' | 'TestExecution', ParentType, ContextType>;
};

export type KeyValuePairResolvers<ContextType = Context, ParentType extends ResolversParentTypes['KeyValuePair'] = ResolversParentTypes['KeyValuePair']> = {
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NetworkEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NetworkEvent'] = ResolversParentTypes['NetworkEvent']> = {
  __resolveType: TypeResolveFn<'HttpNetworkEvent', ParentType, ContextType>;
};

export type NetworkEventTimingResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NetworkEventTiming'] = ResolversParentTypes['NetworkEventTiming']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  until: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  __resolveType: TypeResolveFn<'ConsoleLogEvent' | 'HttpNetworkEvent', ParentType, ContextType>;
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
  Cookie: CookieResolvers<ContextType>;
  Cursor: GraphQLScalarType;
  DateTime: GraphQLScalarType;
  Event: EventResolvers<ContextType>;
  HttpBody: HttpBodyResolvers<ContextType>;
  HttpHeaders: HttpHeadersResolvers<ContextType>;
  HttpNetworkEvent: HttpNetworkEventResolvers<ContextType>;
  HttpNetworkEventInitiator: HttpNetworkEventInitiatorResolvers<ContextType>;
  HttpNetworkRequest: HttpNetworkRequestResolvers<ContextType>;
  HttpNetworkRequestUrl: HttpNetworkRequestUrlResolvers<ContextType>;
  HttpNetworkResponse: HttpNetworkResponseResolvers<ContextType>;
  HttpNetworkTimings: HttpNetworkTimingsResolvers<ContextType>;
  HttpRequestBody: HttpRequestBodyResolvers<ContextType>;
  HttpResponseBody: HttpResponseBodyResolvers<ContextType>;
  HttpResponseBodyChunk: HttpResponseBodyChunkResolvers<ContextType>;
  InstantaneousEvent: InstantaneousEventResolvers<ContextType>;
  IntervalEvent: IntervalEventResolvers<ContextType>;
  KeyValuePair: KeyValuePairResolvers<ContextType>;
  NetworkEvent: NetworkEventResolvers<ContextType>;
  NetworkEventTiming: NetworkEventTimingResolvers<ContextType>;
  Node: NodeResolvers<ContextType>;
  PageInfo: PageInfoResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  TestExecution: TestExecutionResolvers<ContextType>;
  TestExecutionEvent: TestExecutionEventResolvers<ContextType>;
  TestExecutionEventConnection: TestExecutionEventConnectionResolvers<ContextType>;
  TestExecutionEventEdge: TestExecutionEventEdgeResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = Context> = {
  defer: DeferDirectiveResolver<any, any, ContextType>;
  stream: StreamDirectiveResolver<any, any, ContextType>;
};
