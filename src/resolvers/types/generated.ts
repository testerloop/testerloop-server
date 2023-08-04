import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ConsoleLogEventModel, StackTraceModel, HttpNetworkEventModel, StepEventModel, StepEventEdgeModel, StepEventConnectionModel, ScenarioEventModel, TestExecutionModel, TestExecutionConnectionModel, TestExecutionEdgeModel, TestExecutionEventConnectionModel, TestExecutionEventEdgeModel, TestRunModel, TestRunConnectionModel, TestRunEdgeModel, GitHubRevisionModel, CommandChainEventModel, CommandChainEventEdgeModel, CommandChainEventConnectionModel, CommandEventModel, CommandEventEdgeModel, CommandEventConnectionModel, TestExecutionSnapshotModel, TestExecutionScreenshotModel, GitHubRevisionFileModel, GitHubRevisionFileLineModel, GitHubRevisionFileLineColumnModel, SourceCodeManagementRevisionFileLineColumnModel } from './mappers';
import { Context } from '../../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
  /** Represents a valid URL. */
  URL: string;
};

export type BrowserVersion = ChromiumVersion;

export type CallFrame = {
  readonly __typename: 'CallFrame';
  readonly columnNumber: Scalars['Int'];
  readonly functionName: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly lineNumber: Scalars['Int'];
  readonly url: Scalars['URL'];
};

/** See https://www.chromium.org/developers/version-numbers/ */
export type ChromiumVersion = {
  readonly __typename: 'ChromiumVersion';
  readonly build: Scalars['Int'];
  readonly major: Scalars['Int'];
  readonly minor: Scalars['Int'];
  readonly patch: Scalars['Int'];
};

export type CommandChainEvent = Event & IntervalEvent & TestExecutionEvent & {
  readonly __typename: 'CommandChainEvent';
  readonly at: Scalars['DateTime'];
  readonly commands: CommandEventConnection;
  readonly testExecution: TestExecution;
  readonly until: Scalars['DateTime'];
};

export type CommandChainEventConnection = {
  readonly __typename: 'CommandChainEventConnection';
  readonly edges: ReadonlyArray<CommandChainEventEdge>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars['Int'];
};

export type CommandChainEventEdge = {
  readonly __typename: 'CommandChainEventEdge';
  readonly cursor: Scalars['Cursor'];
  readonly node: CommandChainEvent;
};

export type CommandEvent = Event & IntervalEvent & Node & SnapshotEvent & TestExecutionEvent & {
  readonly __typename: 'CommandEvent';
  readonly at: Scalars['DateTime'];
  readonly description: Scalars['String'];
  readonly error: Maybe<CommandEventError>;
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly nextSnapshot: Maybe<TestExecutionSnapshot>;
  readonly previousSnapshot: Maybe<TestExecutionSnapshot>;
  readonly status: CommandEventStatus;
  readonly testExecution: TestExecution;
  readonly until: Scalars['DateTime'];
};

export type CommandEventConnection = {
  readonly __typename: 'CommandEventConnection';
  readonly edges: ReadonlyArray<CommandEventEdge>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars['Int'];
};

export type CommandEventEdge = {
  readonly __typename: 'CommandEventEdge';
  readonly cursor: Scalars['Cursor'];
  readonly node: CommandEvent;
};

export type CommandEventError = {
  readonly __typename: 'CommandEventError';
  readonly location: SourceCodeManagementRevisionFileLineColumn;
  readonly message: Scalars['String'];
  readonly stackTrace: Scalars['String'];
  readonly type: Scalars['String'];
};

export type CommandEventFilterInput = {
  readonly status?: InputMaybe<ReadonlyArray<CommandEventStatus>>;
};

export enum CommandEventStatus {
  Failed = 'FAILED',
  Success = 'SUCCESS'
}

export type ConsoleEvent = {
  readonly at: Scalars['DateTime'];
  readonly testExecution: TestExecution;
};

export type ConsoleEventFilterInput = {
  readonly logLevel?: InputMaybe<ReadonlyArray<ConsoleLogLevel>>;
  readonly logSearch?: InputMaybe<Scalars['String']>;
};

export type ConsoleLogEvent = ConsoleEvent & Event & InstantaneousEvent & Node & TestExecutionEvent & {
  readonly __typename: 'ConsoleLogEvent';
  readonly at: Scalars['DateTime'];
  readonly id: Scalars['ID'];
  readonly logLevel: ConsoleLogLevel;
  readonly message: Scalars['String'];
  readonly stackTrace: StackTrace;
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

export type CreateApiKeyResponse = {
  readonly __typename: 'CreateApiKeyResponse';
  readonly apiKey: Scalars['String'];
};

export type CreateTestExecutionResponse = {
  readonly __typename: 'CreateTestExecutionResponse';
  readonly testExecutionGroupId: Scalars['ID'];
  readonly testExecutionId: Scalars['ID'];
};

export type Event = {
  readonly at: Scalars['DateTime'];
};

export enum Executor {
  Ecs = 'ECS',
  Lambda = 'LAMBDA',
  Local = 'LOCAL'
}

export type Field = {
  readonly __typename: 'Field';
  readonly key: Maybe<Scalars['String']>;
  readonly value: Maybe<Scalars['String']>;
};

export enum GherkinStepKeyword {
  After = 'AFTER',
  And = 'AND',
  Before = 'BEFORE',
  But = 'BUT',
  Given = 'GIVEN',
  Step = 'STEP',
  Then = 'THEN',
  When = 'WHEN'
}

export type GitActor = {
  readonly email: Scalars['String'];
  readonly name: Scalars['String'];
};

export type GitBranch = {
  readonly name: Scalars['String'];
};

export enum GitCommitIdType {
  Long = 'LONG',
  Short = 'SHORT'
}

export type GitHubActor = GitActor & {
  readonly __typename: 'GitHubActor';
  readonly email: Scalars['String'];
  readonly name: Scalars['String'];
  readonly user: Maybe<GitHubUser>;
};

export type GitHubBranch = GitBranch & {
  readonly __typename: 'GitHubBranch';
  readonly name: Scalars['String'];
  readonly url: Scalars['URL'];
};

export type GitHubOrganization = {
  readonly __typename: 'GitHubOrganization';
  readonly name: Scalars['String'];
  readonly slug: Maybe<Scalars['String']>;
  readonly url: Scalars['URL'];
};

export type GitHubRepository = GitRepository & SourceCodeManagementRepository & {
  readonly __typename: 'GitHubRepository';
  readonly _unused: Scalars['Boolean'];
  readonly name: Scalars['String'];
  readonly owner: GitHubRepositoryOwner;
  readonly url: Scalars['URL'];
};

export type GitHubRepositoryOwner = {
  readonly __typename: 'GitHubRepositoryOwner';
  readonly name: Scalars['String'];
  readonly url: Scalars['URL'];
};

export type GitHubRevision = GitRevision & SourceCodeManagementRevision & {
  readonly __typename: 'GitHubRevision';
  readonly author: GitHubActor;
  readonly branch: Maybe<GitHubBranch>;
  readonly commitId: Scalars['String'];
  readonly committer: GitHubActor;
  readonly repository: GitHubRepository;
  readonly url: Scalars['URL'];
};


export type GitHubRevisionCommitIdArgs = {
  type: GitCommitIdType;
};

export type GitHubRevisionFile = GitRevisionFile & SourceCodeManagementRevisionFile & {
  readonly __typename: 'GitHubRevisionFile';
  readonly path: Scalars['String'];
  readonly revision: GitHubRevision;
};

export type GitHubRevisionFileLine = GitRevisionFileLine & SourceCodeManagementRevisionFileLine & {
  readonly __typename: 'GitHubRevisionFileLine';
  readonly file: GitHubRevisionFile;
  readonly line: Scalars['Int'];
  readonly url: Scalars['URL'];
};

export type GitHubRevisionFileLineColumn = GitRevisionFileLineColumn & SourceCodeManagementRevisionFileLineColumn & {
  readonly __typename: 'GitHubRevisionFileLineColumn';
  readonly column: Scalars['Int'];
  readonly line: GitHubRevisionFileLine;
};

export type GitHubUser = {
  readonly __typename: 'GitHubUser';
  readonly avatar: Maybe<Scalars['URL']>;
  readonly name: Scalars['String'];
  readonly url: Scalars['URL'];
  readonly username: Scalars['String'];
};

export type GitRepository = {
  readonly _unused: Scalars['Boolean'];
};

export type GitRevision = {
  readonly author: GitActor;
  readonly branch: Maybe<GitBranch>;
  readonly commitId: Scalars['String'];
  readonly committer: GitActor;
  readonly repository: GitRepository;
};


export type GitRevisionCommitIdArgs = {
  type: GitCommitIdType;
};

export type GitRevisionFile = {
  readonly path: Scalars['String'];
  readonly revision: GitRevision;
};

export type GitRevisionFileLine = {
  readonly file: GitRevisionFile;
  readonly line: Scalars['Int'];
  readonly url: Scalars['URL'];
};

export type GitRevisionFileLineColumn = {
  readonly column: Scalars['Int'];
  readonly line: GitRevisionFileLine;
};

export type HttpBody = {
  readonly data: Scalars['String'];
  readonly encoding: Maybe<Scalars['String']>;
  readonly mimeType: Scalars['String'];
  readonly size: Scalars['Int'];
};

export enum HttpHeaderOrderBy {
  /** The headers will be ordered alphabetically in a case-insensitive way */
  Alphabetical = 'ALPHABETICAL',
  /** The headers will be ordered as they were transmitted over the wire */
  Wire = 'WIRE'
}

export type HttpHeaderOrderInput = {
  readonly by: HttpHeaderOrderBy;
  readonly direction: OrderDirection;
};

export type HttpHeaders = {
  readonly __typename: 'HttpHeaders';
  readonly size: Scalars['Int'];
  readonly values: ReadonlyArray<KeyValuePair>;
};


export type HttpHeadersValuesArgs = {
  order: HttpHeaderOrderInput;
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

export type Mutation = {
  readonly __typename: 'Mutation';
  readonly createApiKey: CreateApiKeyResponse;
  readonly createTestExecution: CreateTestExecutionResponse;
  readonly createTestRun: Maybe<UploadInfo>;
  readonly createWorkers: ReadonlyArray<Worker>;
  readonly refreshRunStatus: RunStatus;
  readonly setTestExecutionStatus: TestExecutionStatus;
  readonly setWorkerStatus: Worker;
};


export type MutationCreateApiKeyArgs = {
  name?: InputMaybe<Scalars['String']>;
  organisationId: Scalars['String'];
};


export type MutationCreateTestExecutionArgs = {
  featureFile: Scalars['String'];
  runID: Scalars['String'];
  testName: Scalars['String'];
  workerId: Scalars['String'];
};


export type MutationCreateTestRunArgs = {
  runEnvironmentDetails: Scalars['String'];
};


export type MutationCreateWorkersArgs = {
  count: Scalars['Int'];
  executor: Executor;
  runID: Scalars['String'];
};


export type MutationRefreshRunStatusArgs = {
  runId: Scalars['ID'];
};


export type MutationSetTestExecutionStatusArgs = {
  testExecutionId: Scalars['ID'];
  testStatus: TestStatus;
};


export type MutationSetWorkerStatusArgs = {
  status: WorkerStatus;
  workerID: Scalars['ID'];
};

export type NetworkEvent = {
  readonly at: Scalars['DateTime'];
  readonly id: Scalars['ID'];
  readonly until: Scalars['DateTime'];
};

export type NetworkEventFilterInput = {
  readonly resourceType?: InputMaybe<ReadonlyArray<HttpNetworkEventResourceType>>;
  readonly status?: InputMaybe<NetworkEventResponseStatusFilterInput>;
  readonly urlSearch?: InputMaybe<Scalars['String']>;
};

export type NetworkEventResponseStatusFilterInput = {
  readonly gte?: InputMaybe<Scalars['Int']>;
  readonly lte?: InputMaybe<Scalars['Int']>;
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

export enum OrderDirection {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

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
  readonly consoleLogEvent: Maybe<ConsoleLogEvent>;
  readonly getRunStatus: TestRunStatus;
  readonly httpNetworkEvent: Maybe<HttpNetworkEvent>;
  readonly node: Maybe<Node>;
  readonly testExecution: Maybe<TestExecution>;
  readonly testRun: Maybe<TestRun>;
  readonly testRuns: TestRunConnection;
  readonly worker: Worker;
};


export type QueryConsoleLogEventArgs = {
  id: Scalars['ID'];
};


export type QueryGetRunStatusArgs = {
  runId: Scalars['ID'];
};


export type QueryHttpNetworkEventArgs = {
  id: Scalars['ID'];
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryTestExecutionArgs = {
  id: Scalars['ID'];
};


export type QueryTestRunArgs = {
  id: Scalars['ID'];
};


export type QueryTestRunsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryWorkerArgs = {
  id: Scalars['ID'];
};

export enum RunStatus {
  Completed = 'COMPLETED',
  Running = 'RUNNING'
}

export type S3Config = {
  readonly bucket: Scalars['String'];
  readonly customerPath: Scalars['String'];
};

export type ScenarioDefinition = {
  readonly __typename: 'ScenarioDefinition';
  readonly description: Scalars['String'];
};

export type ScenarioEvent = Event & IntervalEvent & TestExecutionEvent & {
  readonly __typename: 'ScenarioEvent';
  readonly at: Scalars['DateTime'];
  readonly definition: ScenarioDefinition;
  readonly steps: StepEventConnection;
  readonly testExecution: TestExecution;
  readonly until: Scalars['DateTime'];
};

export type SignedUrl = {
  readonly __typename: 'SignedURL';
  readonly expiresAt: Scalars['DateTime'];
  readonly url: Scalars['URL'];
};

export type SnapshotEvent = {
  readonly at: Scalars['DateTime'];
  readonly nextSnapshot: Maybe<TestExecutionSnapshot>;
  readonly previousSnapshot: Maybe<TestExecutionSnapshot>;
};

export type SourceCodeManagementRepository = {
  readonly _unused: Scalars['Boolean'];
};

export type SourceCodeManagementRevision = {
  readonly repository: SourceCodeManagementRepository;
};

export type SourceCodeManagementRevisionFile = {
  readonly path: Scalars['String'];
  readonly revision: SourceCodeManagementRevision;
};

export type SourceCodeManagementRevisionFileLine = {
  readonly file: SourceCodeManagementRevisionFile;
  readonly line: Scalars['Int'];
  readonly url: Scalars['URL'];
};

export type SourceCodeManagementRevisionFileLineColumn = {
  readonly column: Scalars['Int'];
  readonly line: SourceCodeManagementRevisionFileLine;
};

export type StackTrace = {
  readonly __typename: 'StackTrace';
  readonly callFrames: ReadonlyArray<CallFrame>;
  readonly id: Scalars['ID'];
};

export type StepDefinition = {
  readonly __typename: 'StepDefinition';
  readonly description: Scalars['String'];
  readonly keyword: GherkinStepKeyword;
};

export type StepEvent = Event & IntervalEvent & Node & SnapshotEvent & TestExecutionEvent & {
  readonly __typename: 'StepEvent';
  readonly at: Scalars['DateTime'];
  readonly commandChains: CommandChainEventConnection;
  readonly definition: StepDefinition;
  readonly id: Scalars['ID'];
  readonly nextSnapshot: Maybe<TestExecutionSnapshot>;
  readonly previousSnapshot: Maybe<TestExecutionSnapshot>;
  readonly status: CommandEventStatus;
  readonly testExecution: TestExecution;
  readonly until: Scalars['DateTime'];
};

export type StepEventConnection = {
  readonly __typename: 'StepEventConnection';
  readonly edges: ReadonlyArray<StepEventEdge>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars['Int'];
};

export type StepEventEdge = {
  readonly __typename: 'StepEventEdge';
  readonly cursor: Scalars['Cursor'];
  readonly node: StepEvent;
};

export type TestExecution = Event & IntervalEvent & Node & {
  readonly __typename: 'TestExecution';
  readonly at: Scalars['DateTime'];
  readonly environment: TestExecutionEnvironment;
  readonly events: TestExecutionEventConnection;
  readonly id: Scalars['ID'];
  readonly rerunOf: Maybe<TestExecution>;
  readonly reruns: ReadonlyArray<TestExecution>;
  readonly testRun: TestRun;
  readonly title: Scalars['String'];
  readonly until: Scalars['DateTime'];
};


export type TestExecutionEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<TestExecutionEventFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
};

export type TestExecutionConnection = {
  readonly __typename: 'TestExecutionConnection';
  readonly edges: ReadonlyArray<TestExecutionEdge>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars['Int'];
};

export type TestExecutionEdge = {
  readonly __typename: 'TestExecutionEdge';
  readonly cursor: Scalars['Cursor'];
  readonly node: TestExecution;
};

export type TestExecutionEnvironment = {
  readonly __typename: 'TestExecutionEnvironment';
  readonly browser: BrowserVersion;
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
  readonly commandFilter?: InputMaybe<CommandEventFilterInput>;
  readonly consoleFilter?: InputMaybe<ConsoleEventFilterInput>;
  readonly networkFilter?: InputMaybe<NetworkEventFilterInput>;
  readonly type?: InputMaybe<ReadonlyArray<TestExecutionEventType>>;
};

export enum TestExecutionEventType {
  /** Returns all commands executed in the `TestExecution` flattened outside of the test layout. */
  Command = 'COMMAND',
  Console = 'CONSOLE',
  Network = 'NETWORK',
  Screenshot = 'SCREENSHOT',
  /** Returns all of the steps of the `TestExecution`, flattened outside of their containing `BackgroundEvent` or `ScenarioEvent`. */
  Step = 'STEP',
  /**
   * Returns the top-level parts of the `TestExecution`
   *
   * For BDD this will be `BackgroundEvent` & `ScenarioEvent`.
   * For other tests, this can include `Before All`/`Before Each`/`Test`/`After Each`/`After All` parts
   */
  TestPart = 'TEST_PART'
}

export type TestExecutionScreenshot = Event & InstantaneousEvent & Node & TestExecutionEvent & {
  readonly __typename: 'TestExecutionScreenshot';
  readonly at: Scalars['DateTime'];
  readonly id: Scalars['ID'];
  readonly testExecution: TestExecution;
  /** Returns a signed URL for fetching this screenshot from S3. */
  readonly url: SignedUrl;
};

export type TestExecutionSnapshot = Event & InstantaneousEvent & TestExecutionEvent & {
  readonly __typename: 'TestExecutionSnapshot';
  readonly at: Scalars['DateTime'];
  readonly dom: Scalars['String'];
  readonly testExecution: TestExecution;
};

export type TestExecutionStatus = {
  readonly __typename: 'TestExecutionStatus';
  readonly featureFile: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly rerunOfId: Maybe<Scalars['ID']>;
  readonly testName: Scalars['String'];
  readonly testStatus: TestStatus;
};

export type TestRun = Node & {
  readonly __typename: 'TestRun';
  readonly executions: TestExecutionConnection;
  readonly id: Scalars['ID'];
  /** This field may be null if the data was not provided for collection. */
  readonly testCodeRevision: Maybe<SourceCodeManagementRevision>;
};


export type TestRunExecutionsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type TestRunConnection = {
  readonly __typename: 'TestRunConnection';
  readonly edges: ReadonlyArray<TestRunEdge>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars['Int'];
};

export type TestRunEdge = {
  readonly __typename: 'TestRunEdge';
  readonly cursor: Scalars['Cursor'];
  readonly node: TestRun;
};

export type TestRunStatus = {
  readonly __typename: 'TestRunStatus';
  readonly runStatus: RunStatus;
  readonly testExecutionStatuses: ReadonlyArray<Maybe<TestExecutionStatus>>;
};

export enum TestStatus {
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Passed = 'PASSED'
}

export type UploadInfo = {
  readonly __typename: 'UploadInfo';
  readonly fields: Maybe<ReadonlyArray<Maybe<Field>>>;
  readonly runID: Maybe<Scalars['String']>;
  readonly s3RunPath: Maybe<Scalars['String']>;
  readonly url: Maybe<Scalars['String']>;
};

export type Worker = {
  readonly __typename: 'Worker';
  readonly completedAt: Maybe<Scalars['DateTime']>;
  readonly createdAt: Scalars['DateTime'];
  readonly executor: Executor;
  readonly id: Scalars['ID'];
  readonly startedAt: Maybe<Scalars['DateTime']>;
  readonly status: WorkerStatus;
  readonly testExecutions: ReadonlyArray<Maybe<TestExecution>>;
  readonly testRunId: Scalars['ID'];
};

export enum WorkerStatus {
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Started = 'STARTED'
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
  BrowserVersion: ResolversTypes['ChromiumVersion'];
  CallFrame: ResolverTypeWrapper<CallFrame>;
  ChromiumVersion: ResolverTypeWrapper<ChromiumVersion>;
  CommandChainEvent: ResolverTypeWrapper<CommandChainEventModel>;
  CommandChainEventConnection: ResolverTypeWrapper<CommandChainEventConnectionModel>;
  CommandChainEventEdge: ResolverTypeWrapper<CommandChainEventEdgeModel>;
  CommandEvent: ResolverTypeWrapper<CommandEventModel>;
  CommandEventConnection: ResolverTypeWrapper<CommandEventConnectionModel>;
  CommandEventEdge: ResolverTypeWrapper<CommandEventEdgeModel>;
  CommandEventError: ResolverTypeWrapper<Omit<CommandEventError, 'location'> & { location: ResolversTypes['SourceCodeManagementRevisionFileLineColumn'] }>;
  CommandEventFilterInput: CommandEventFilterInput;
  CommandEventStatus: CommandEventStatus;
  ConsoleEvent: ResolversTypes['ConsoleLogEvent'];
  ConsoleEventFilterInput: ConsoleEventFilterInput;
  ConsoleLogEvent: ResolverTypeWrapper<ConsoleLogEventModel>;
  ConsoleLogLevel: ConsoleLogLevel;
  Cookie: ResolverTypeWrapper<Cookie>;
  CreateApiKeyResponse: ResolverTypeWrapper<CreateApiKeyResponse>;
  CreateTestExecutionResponse: ResolverTypeWrapper<CreateTestExecutionResponse>;
  Cursor: ResolverTypeWrapper<Scalars['Cursor']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Event: ResolversTypes['CommandChainEvent'] | ResolversTypes['CommandEvent'] | ResolversTypes['ConsoleLogEvent'] | ResolversTypes['HttpNetworkEvent'] | ResolversTypes['HttpResponseBodyChunk'] | ResolversTypes['NetworkEventTiming'] | ResolversTypes['ScenarioEvent'] | ResolversTypes['StepEvent'] | ResolversTypes['TestExecution'] | ResolversTypes['TestExecutionScreenshot'] | ResolversTypes['TestExecutionSnapshot'];
  Executor: Executor;
  Field: ResolverTypeWrapper<Field>;
  GherkinStepKeyword: GherkinStepKeyword;
  GitActor: ResolversTypes['GitHubActor'];
  GitBranch: ResolversTypes['GitHubBranch'];
  GitCommitIdType: GitCommitIdType;
  GitHubActor: ResolverTypeWrapper<GitHubActor>;
  GitHubBranch: ResolverTypeWrapper<GitHubBranch>;
  GitHubOrganization: ResolverTypeWrapper<GitHubOrganization>;
  GitHubRepository: ResolverTypeWrapper<GitHubRepository>;
  GitHubRepositoryOwner: ResolverTypeWrapper<GitHubRepositoryOwner>;
  GitHubRevision: ResolverTypeWrapper<GitHubRevisionModel>;
  GitHubRevisionFile: ResolverTypeWrapper<GitHubRevisionFileModel>;
  GitHubRevisionFileLine: ResolverTypeWrapper<GitHubRevisionFileLineModel>;
  GitHubRevisionFileLineColumn: ResolverTypeWrapper<GitHubRevisionFileLineColumnModel>;
  GitHubUser: ResolverTypeWrapper<GitHubUser>;
  GitRepository: ResolversTypes['GitHubRepository'];
  GitRevision: ResolversTypes['GitHubRevision'];
  GitRevisionFile: ResolversTypes['GitHubRevisionFile'];
  GitRevisionFileLine: ResolversTypes['GitHubRevisionFileLine'];
  GitRevisionFileLineColumn: ResolversTypes['GitHubRevisionFileLineColumn'];
  HttpBody: ResolversTypes['HttpRequestBody'] | ResolversTypes['HttpResponseBody'];
  HttpHeaderOrderBy: HttpHeaderOrderBy;
  HttpHeaderOrderInput: HttpHeaderOrderInput;
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
  InstantaneousEvent: ResolversTypes['ConsoleLogEvent'] | ResolversTypes['HttpResponseBodyChunk'] | ResolversTypes['TestExecutionScreenshot'] | ResolversTypes['TestExecutionSnapshot'];
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntervalEvent: ResolversTypes['CommandChainEvent'] | ResolversTypes['CommandEvent'] | ResolversTypes['HttpNetworkEvent'] | ResolversTypes['NetworkEventTiming'] | ResolversTypes['ScenarioEvent'] | ResolversTypes['StepEvent'] | ResolversTypes['TestExecution'];
  KeyValuePair: ResolverTypeWrapper<KeyValuePair>;
  Mutation: ResolverTypeWrapper<unknown>;
  NetworkEvent: ResolversTypes['HttpNetworkEvent'];
  NetworkEventFilterInput: NetworkEventFilterInput;
  NetworkEventResponseStatusFilterInput: NetworkEventResponseStatusFilterInput;
  NetworkEventTiming: ResolverTypeWrapper<NetworkEventTiming>;
  Node: ResolversTypes['CommandEvent'] | ResolversTypes['ConsoleLogEvent'] | ResolversTypes['StepEvent'] | ResolversTypes['TestExecution'] | ResolversTypes['TestExecutionScreenshot'] | ResolversTypes['TestRun'];
  OrderDirection: OrderDirection;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<unknown>;
  RunStatus: RunStatus;
  S3Config: S3Config;
  ScenarioDefinition: ResolverTypeWrapper<ScenarioDefinition>;
  ScenarioEvent: ResolverTypeWrapper<ScenarioEventModel>;
  SignedURL: ResolverTypeWrapper<SignedUrl>;
  SnapshotEvent: ResolversTypes['CommandEvent'] | ResolversTypes['StepEvent'];
  SourceCodeManagementRepository: ResolversTypes['GitHubRepository'];
  SourceCodeManagementRevision: ResolversTypes['GitHubRevision'];
  SourceCodeManagementRevisionFile: ResolversTypes['GitHubRevisionFile'];
  SourceCodeManagementRevisionFileLine: ResolversTypes['GitHubRevisionFileLine'];
  SourceCodeManagementRevisionFileLineColumn: ResolverTypeWrapper<SourceCodeManagementRevisionFileLineColumnModel>;
  StackTrace: ResolverTypeWrapper<StackTraceModel>;
  StepDefinition: ResolverTypeWrapper<StepDefinition>;
  StepEvent: ResolverTypeWrapper<StepEventModel>;
  StepEventConnection: ResolverTypeWrapper<StepEventConnectionModel>;
  StepEventEdge: ResolverTypeWrapper<StepEventEdgeModel>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TestExecution: ResolverTypeWrapper<TestExecutionModel>;
  TestExecutionConnection: ResolverTypeWrapper<TestExecutionConnectionModel>;
  TestExecutionEdge: ResolverTypeWrapper<TestExecutionEdgeModel>;
  TestExecutionEnvironment: ResolverTypeWrapper<Omit<TestExecutionEnvironment, 'browser'> & { browser: ResolversTypes['BrowserVersion'] }>;
  TestExecutionEvent: ResolversTypes['CommandChainEvent'] | ResolversTypes['CommandEvent'] | ResolversTypes['ConsoleLogEvent'] | ResolversTypes['HttpNetworkEvent'] | ResolversTypes['ScenarioEvent'] | ResolversTypes['StepEvent'] | ResolversTypes['TestExecutionScreenshot'] | ResolversTypes['TestExecutionSnapshot'];
  TestExecutionEventConnection: ResolverTypeWrapper<TestExecutionEventConnectionModel>;
  TestExecutionEventEdge: ResolverTypeWrapper<TestExecutionEventEdgeModel>;
  TestExecutionEventFilterInput: TestExecutionEventFilterInput;
  TestExecutionEventType: TestExecutionEventType;
  TestExecutionScreenshot: ResolverTypeWrapper<TestExecutionScreenshotModel>;
  TestExecutionSnapshot: ResolverTypeWrapper<TestExecutionSnapshotModel>;
  TestExecutionStatus: ResolverTypeWrapper<TestExecutionStatus>;
  TestRun: ResolverTypeWrapper<TestRunModel>;
  TestRunConnection: ResolverTypeWrapper<TestRunConnectionModel>;
  TestRunEdge: ResolverTypeWrapper<TestRunEdgeModel>;
  TestRunStatus: ResolverTypeWrapper<TestRunStatus>;
  TestStatus: TestStatus;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  UploadInfo: ResolverTypeWrapper<UploadInfo>;
  Worker: ResolverTypeWrapper<Omit<Worker, 'testExecutions'> & { testExecutions: ReadonlyArray<Maybe<ResolversTypes['TestExecution']>> }>;
  WorkerStatus: WorkerStatus;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  BrowserVersion: ResolversParentTypes['ChromiumVersion'];
  CallFrame: CallFrame;
  ChromiumVersion: ChromiumVersion;
  CommandChainEvent: CommandChainEventModel;
  CommandChainEventConnection: CommandChainEventConnectionModel;
  CommandChainEventEdge: CommandChainEventEdgeModel;
  CommandEvent: CommandEventModel;
  CommandEventConnection: CommandEventConnectionModel;
  CommandEventEdge: CommandEventEdgeModel;
  CommandEventError: Omit<CommandEventError, 'location'> & { location: ResolversParentTypes['SourceCodeManagementRevisionFileLineColumn'] };
  CommandEventFilterInput: CommandEventFilterInput;
  ConsoleEvent: ResolversParentTypes['ConsoleLogEvent'];
  ConsoleEventFilterInput: ConsoleEventFilterInput;
  ConsoleLogEvent: ConsoleLogEventModel;
  Cookie: Cookie;
  CreateApiKeyResponse: CreateApiKeyResponse;
  CreateTestExecutionResponse: CreateTestExecutionResponse;
  Cursor: Scalars['Cursor'];
  DateTime: Scalars['DateTime'];
  Event: ResolversParentTypes['CommandChainEvent'] | ResolversParentTypes['CommandEvent'] | ResolversParentTypes['ConsoleLogEvent'] | ResolversParentTypes['HttpNetworkEvent'] | ResolversParentTypes['HttpResponseBodyChunk'] | ResolversParentTypes['NetworkEventTiming'] | ResolversParentTypes['ScenarioEvent'] | ResolversParentTypes['StepEvent'] | ResolversParentTypes['TestExecution'] | ResolversParentTypes['TestExecutionScreenshot'] | ResolversParentTypes['TestExecutionSnapshot'];
  Field: Field;
  GitActor: ResolversParentTypes['GitHubActor'];
  GitBranch: ResolversParentTypes['GitHubBranch'];
  GitHubActor: GitHubActor;
  GitHubBranch: GitHubBranch;
  GitHubOrganization: GitHubOrganization;
  GitHubRepository: GitHubRepository;
  GitHubRepositoryOwner: GitHubRepositoryOwner;
  GitHubRevision: GitHubRevisionModel;
  GitHubRevisionFile: GitHubRevisionFileModel;
  GitHubRevisionFileLine: GitHubRevisionFileLineModel;
  GitHubRevisionFileLineColumn: GitHubRevisionFileLineColumnModel;
  GitHubUser: GitHubUser;
  GitRepository: ResolversParentTypes['GitHubRepository'];
  GitRevision: ResolversParentTypes['GitHubRevision'];
  GitRevisionFile: ResolversParentTypes['GitHubRevisionFile'];
  GitRevisionFileLine: ResolversParentTypes['GitHubRevisionFileLine'];
  GitRevisionFileLineColumn: ResolversParentTypes['GitHubRevisionFileLineColumn'];
  HttpBody: ResolversParentTypes['HttpRequestBody'] | ResolversParentTypes['HttpResponseBody'];
  HttpHeaderOrderInput: HttpHeaderOrderInput;
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
  InstantaneousEvent: ResolversParentTypes['ConsoleLogEvent'] | ResolversParentTypes['HttpResponseBodyChunk'] | ResolversParentTypes['TestExecutionScreenshot'] | ResolversParentTypes['TestExecutionSnapshot'];
  Int: Scalars['Int'];
  IntervalEvent: ResolversParentTypes['CommandChainEvent'] | ResolversParentTypes['CommandEvent'] | ResolversParentTypes['HttpNetworkEvent'] | ResolversParentTypes['NetworkEventTiming'] | ResolversParentTypes['ScenarioEvent'] | ResolversParentTypes['StepEvent'] | ResolversParentTypes['TestExecution'];
  KeyValuePair: KeyValuePair;
  Mutation: unknown;
  NetworkEvent: ResolversParentTypes['HttpNetworkEvent'];
  NetworkEventFilterInput: NetworkEventFilterInput;
  NetworkEventResponseStatusFilterInput: NetworkEventResponseStatusFilterInput;
  NetworkEventTiming: NetworkEventTiming;
  Node: ResolversParentTypes['CommandEvent'] | ResolversParentTypes['ConsoleLogEvent'] | ResolversParentTypes['StepEvent'] | ResolversParentTypes['TestExecution'] | ResolversParentTypes['TestExecutionScreenshot'] | ResolversParentTypes['TestRun'];
  PageInfo: PageInfo;
  Query: unknown;
  S3Config: S3Config;
  ScenarioDefinition: ScenarioDefinition;
  ScenarioEvent: ScenarioEventModel;
  SignedURL: SignedUrl;
  SnapshotEvent: ResolversParentTypes['CommandEvent'] | ResolversParentTypes['StepEvent'];
  SourceCodeManagementRepository: ResolversParentTypes['GitHubRepository'];
  SourceCodeManagementRevision: ResolversParentTypes['GitHubRevision'];
  SourceCodeManagementRevisionFile: ResolversParentTypes['GitHubRevisionFile'];
  SourceCodeManagementRevisionFileLine: ResolversParentTypes['GitHubRevisionFileLine'];
  SourceCodeManagementRevisionFileLineColumn: SourceCodeManagementRevisionFileLineColumnModel;
  StackTrace: StackTraceModel;
  StepDefinition: StepDefinition;
  StepEvent: StepEventModel;
  StepEventConnection: StepEventConnectionModel;
  StepEventEdge: StepEventEdgeModel;
  String: Scalars['String'];
  TestExecution: TestExecutionModel;
  TestExecutionConnection: TestExecutionConnectionModel;
  TestExecutionEdge: TestExecutionEdgeModel;
  TestExecutionEnvironment: Omit<TestExecutionEnvironment, 'browser'> & { browser: ResolversParentTypes['BrowserVersion'] };
  TestExecutionEvent: ResolversParentTypes['CommandChainEvent'] | ResolversParentTypes['CommandEvent'] | ResolversParentTypes['ConsoleLogEvent'] | ResolversParentTypes['HttpNetworkEvent'] | ResolversParentTypes['ScenarioEvent'] | ResolversParentTypes['StepEvent'] | ResolversParentTypes['TestExecutionScreenshot'] | ResolversParentTypes['TestExecutionSnapshot'];
  TestExecutionEventConnection: TestExecutionEventConnectionModel;
  TestExecutionEventEdge: TestExecutionEventEdgeModel;
  TestExecutionEventFilterInput: TestExecutionEventFilterInput;
  TestExecutionScreenshot: TestExecutionScreenshotModel;
  TestExecutionSnapshot: TestExecutionSnapshotModel;
  TestExecutionStatus: TestExecutionStatus;
  TestRun: TestRunModel;
  TestRunConnection: TestRunConnectionModel;
  TestRunEdge: TestRunEdgeModel;
  TestRunStatus: TestRunStatus;
  URL: Scalars['URL'];
  UploadInfo: UploadInfo;
  Worker: Omit<Worker, 'testExecutions'> & { testExecutions: ReadonlyArray<Maybe<ResolversParentTypes['TestExecution']>> };
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

export type BrowserVersionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BrowserVersion'] = ResolversParentTypes['BrowserVersion']> = {
  __resolveType: TypeResolveFn<'ChromiumVersion', ParentType, ContextType>;
};

export type CallFrameResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CallFrame'] = ResolversParentTypes['CallFrame']> = {
  columnNumber: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  functionName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineNumber: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  url: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChromiumVersionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ChromiumVersion'] = ResolversParentTypes['ChromiumVersion']> = {
  build: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  major: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minor: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  patch: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommandChainEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommandChainEvent'] = ResolversParentTypes['CommandChainEvent']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  commands: Resolver<ResolversTypes['CommandEventConnection'], ParentType, ContextType>;
  testExecution: Resolver<ResolversTypes['TestExecution'], ParentType, ContextType>;
  until: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommandChainEventConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommandChainEventConnection'] = ResolversParentTypes['CommandChainEventConnection']> = {
  edges: Resolver<ReadonlyArray<ResolversTypes['CommandChainEventEdge']>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommandChainEventEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommandChainEventEdge'] = ResolversParentTypes['CommandChainEventEdge']> = {
  cursor: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  node: Resolver<ResolversTypes['CommandChainEvent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommandEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommandEvent'] = ResolversParentTypes['CommandEvent']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  error: Resolver<Maybe<ResolversTypes['CommandEventError']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nextSnapshot: Resolver<Maybe<ResolversTypes['TestExecutionSnapshot']>, ParentType, ContextType>;
  previousSnapshot: Resolver<Maybe<ResolversTypes['TestExecutionSnapshot']>, ParentType, ContextType>;
  status: Resolver<ResolversTypes['CommandEventStatus'], ParentType, ContextType>;
  testExecution: Resolver<ResolversTypes['TestExecution'], ParentType, ContextType>;
  until: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type CommandEventErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommandEventError'] = ResolversParentTypes['CommandEventError']> = {
  location: Resolver<ResolversTypes['SourceCodeManagementRevisionFileLineColumn'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stackTrace: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConsoleEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ConsoleEvent'] = ResolversParentTypes['ConsoleEvent']> = {
  __resolveType: TypeResolveFn<'ConsoleLogEvent', ParentType, ContextType>;
};

export type ConsoleLogEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ConsoleLogEvent'] = ResolversParentTypes['ConsoleLogEvent']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logLevel: Resolver<ResolversTypes['ConsoleLogLevel'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stackTrace: Resolver<ResolversTypes['StackTrace'], ParentType, ContextType>;
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

export type CreateApiKeyResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateApiKeyResponse'] = ResolversParentTypes['CreateApiKeyResponse']> = {
  apiKey: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTestExecutionResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateTestExecutionResponse'] = ResolversParentTypes['CreateTestExecutionResponse']> = {
  testExecutionGroupId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  testExecutionId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface CursorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cursor'], any> {
  name: 'Cursor';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  __resolveType: TypeResolveFn<'CommandChainEvent' | 'CommandEvent' | 'ConsoleLogEvent' | 'HttpNetworkEvent' | 'HttpResponseBodyChunk' | 'NetworkEventTiming' | 'ScenarioEvent' | 'StepEvent' | 'TestExecution' | 'TestExecutionScreenshot' | 'TestExecutionSnapshot', ParentType, ContextType>;
};

export type FieldResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Field'] = ResolversParentTypes['Field']> = {
  key: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitActorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitActor'] = ResolversParentTypes['GitActor']> = {
  __resolveType: TypeResolveFn<'GitHubActor', ParentType, ContextType>;
};

export type GitBranchResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitBranch'] = ResolversParentTypes['GitBranch']> = {
  __resolveType: TypeResolveFn<'GitHubBranch', ParentType, ContextType>;
};

export type GitHubActorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitHubActor'] = ResolversParentTypes['GitHubActor']> = {
  email: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user: Resolver<Maybe<ResolversTypes['GitHubUser']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitHubBranchResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitHubBranch'] = ResolversParentTypes['GitHubBranch']> = {
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitHubOrganizationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitHubOrganization'] = ResolversParentTypes['GitHubOrganization']> = {
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitHubRepositoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitHubRepository'] = ResolversParentTypes['GitHubRepository']> = {
  _unused: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner: Resolver<ResolversTypes['GitHubRepositoryOwner'], ParentType, ContextType>;
  url: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitHubRepositoryOwnerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitHubRepositoryOwner'] = ResolversParentTypes['GitHubRepositoryOwner']> = {
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitHubRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitHubRevision'] = ResolversParentTypes['GitHubRevision']> = {
  author: Resolver<ResolversTypes['GitHubActor'], ParentType, ContextType>;
  branch: Resolver<Maybe<ResolversTypes['GitHubBranch']>, ParentType, ContextType>;
  commitId: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<GitHubRevisionCommitIdArgs, 'type'>>;
  committer: Resolver<ResolversTypes['GitHubActor'], ParentType, ContextType>;
  repository: Resolver<ResolversTypes['GitHubRepository'], ParentType, ContextType>;
  url: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitHubRevisionFileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitHubRevisionFile'] = ResolversParentTypes['GitHubRevisionFile']> = {
  path: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revision: Resolver<ResolversTypes['GitHubRevision'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitHubRevisionFileLineResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitHubRevisionFileLine'] = ResolversParentTypes['GitHubRevisionFileLine']> = {
  file: Resolver<ResolversTypes['GitHubRevisionFile'], ParentType, ContextType>;
  line: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  url: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitHubRevisionFileLineColumnResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitHubRevisionFileLineColumn'] = ResolversParentTypes['GitHubRevisionFileLineColumn']> = {
  column: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  line: Resolver<ResolversTypes['GitHubRevisionFileLine'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitHubUserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitHubUser'] = ResolversParentTypes['GitHubUser']> = {
  avatar: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  username: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitRepositoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitRepository'] = ResolversParentTypes['GitRepository']> = {
  __resolveType: TypeResolveFn<'GitHubRepository', ParentType, ContextType>;
};

export type GitRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitRevision'] = ResolversParentTypes['GitRevision']> = {
  __resolveType: TypeResolveFn<'GitHubRevision', ParentType, ContextType>;
};

export type GitRevisionFileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitRevisionFile'] = ResolversParentTypes['GitRevisionFile']> = {
  __resolveType: TypeResolveFn<'GitHubRevisionFile', ParentType, ContextType>;
};

export type GitRevisionFileLineResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitRevisionFileLine'] = ResolversParentTypes['GitRevisionFileLine']> = {
  __resolveType: TypeResolveFn<'GitHubRevisionFileLine', ParentType, ContextType>;
};

export type GitRevisionFileLineColumnResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GitRevisionFileLineColumn'] = ResolversParentTypes['GitRevisionFileLineColumn']> = {
  __resolveType: TypeResolveFn<'GitHubRevisionFileLineColumn', ParentType, ContextType>;
};

export type HttpBodyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HttpBody'] = ResolversParentTypes['HttpBody']> = {
  __resolveType: TypeResolveFn<'HttpRequestBody' | 'HttpResponseBody', ParentType, ContextType>;
};

export type HttpHeadersResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HttpHeaders'] = ResolversParentTypes['HttpHeaders']> = {
  size: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  values: Resolver<ReadonlyArray<ResolversTypes['KeyValuePair']>, ParentType, ContextType, RequireFields<HttpHeadersValuesArgs, 'order'>>;
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
  __resolveType: TypeResolveFn<'ConsoleLogEvent' | 'HttpResponseBodyChunk' | 'TestExecutionScreenshot' | 'TestExecutionSnapshot', ParentType, ContextType>;
};

export type IntervalEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['IntervalEvent'] = ResolversParentTypes['IntervalEvent']> = {
  __resolveType: TypeResolveFn<'CommandChainEvent' | 'CommandEvent' | 'HttpNetworkEvent' | 'NetworkEventTiming' | 'ScenarioEvent' | 'StepEvent' | 'TestExecution', ParentType, ContextType>;
};

export type KeyValuePairResolvers<ContextType = Context, ParentType extends ResolversParentTypes['KeyValuePair'] = ResolversParentTypes['KeyValuePair']> = {
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createApiKey: Resolver<ResolversTypes['CreateApiKeyResponse'], ParentType, ContextType, RequireFields<MutationCreateApiKeyArgs, 'organisationId'>>;
  createTestExecution: Resolver<ResolversTypes['CreateTestExecutionResponse'], ParentType, ContextType, RequireFields<MutationCreateTestExecutionArgs, 'featureFile' | 'runID' | 'testName' | 'workerId'>>;
  createTestRun: Resolver<Maybe<ResolversTypes['UploadInfo']>, ParentType, ContextType, RequireFields<MutationCreateTestRunArgs, 'runEnvironmentDetails'>>;
  createWorkers: Resolver<ReadonlyArray<ResolversTypes['Worker']>, ParentType, ContextType, RequireFields<MutationCreateWorkersArgs, 'count' | 'executor' | 'runID'>>;
  refreshRunStatus: Resolver<ResolversTypes['RunStatus'], ParentType, ContextType, RequireFields<MutationRefreshRunStatusArgs, 'runId'>>;
  setTestExecutionStatus: Resolver<ResolversTypes['TestExecutionStatus'], ParentType, ContextType, RequireFields<MutationSetTestExecutionStatusArgs, 'testExecutionId' | 'testStatus'>>;
  setWorkerStatus: Resolver<ResolversTypes['Worker'], ParentType, ContextType, RequireFields<MutationSetWorkerStatusArgs, 'status' | 'workerID'>>;
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
  __resolveType: TypeResolveFn<'CommandEvent' | 'ConsoleLogEvent' | 'StepEvent' | 'TestExecution' | 'TestExecutionScreenshot' | 'TestRun', ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  hasNextPage: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  consoleLogEvent: Resolver<Maybe<ResolversTypes['ConsoleLogEvent']>, ParentType, ContextType, RequireFields<QueryConsoleLogEventArgs, 'id'>>;
  getRunStatus: Resolver<ResolversTypes['TestRunStatus'], ParentType, ContextType, RequireFields<QueryGetRunStatusArgs, 'runId'>>;
  httpNetworkEvent: Resolver<Maybe<ResolversTypes['HttpNetworkEvent']>, ParentType, ContextType, RequireFields<QueryHttpNetworkEventArgs, 'id'>>;
  node: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  testExecution: Resolver<Maybe<ResolversTypes['TestExecution']>, ParentType, ContextType, RequireFields<QueryTestExecutionArgs, 'id'>>;
  testRun: Resolver<Maybe<ResolversTypes['TestRun']>, ParentType, ContextType, RequireFields<QueryTestRunArgs, 'id'>>;
  testRuns: Resolver<ResolversTypes['TestRunConnection'], ParentType, ContextType, Partial<QueryTestRunsArgs>>;
  worker: Resolver<ResolversTypes['Worker'], ParentType, ContextType, RequireFields<QueryWorkerArgs, 'id'>>;
};

export type ScenarioDefinitionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ScenarioDefinition'] = ResolversParentTypes['ScenarioDefinition']> = {
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScenarioEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ScenarioEvent'] = ResolversParentTypes['ScenarioEvent']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  definition: Resolver<ResolversTypes['ScenarioDefinition'], ParentType, ContextType>;
  steps: Resolver<ResolversTypes['StepEventConnection'], ParentType, ContextType>;
  testExecution: Resolver<ResolversTypes['TestExecution'], ParentType, ContextType>;
  until: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SignedUrlResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SignedURL'] = ResolversParentTypes['SignedURL']> = {
  expiresAt: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SnapshotEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SnapshotEvent'] = ResolversParentTypes['SnapshotEvent']> = {
  __resolveType: TypeResolveFn<'CommandEvent' | 'StepEvent', ParentType, ContextType>;
};

export type SourceCodeManagementRepositoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SourceCodeManagementRepository'] = ResolversParentTypes['SourceCodeManagementRepository']> = {
  __resolveType: TypeResolveFn<'GitHubRepository', ParentType, ContextType>;
};

export type SourceCodeManagementRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SourceCodeManagementRevision'] = ResolversParentTypes['SourceCodeManagementRevision']> = {
  __resolveType: TypeResolveFn<'GitHubRevision', ParentType, ContextType>;
};

export type SourceCodeManagementRevisionFileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SourceCodeManagementRevisionFile'] = ResolversParentTypes['SourceCodeManagementRevisionFile']> = {
  __resolveType: TypeResolveFn<'GitHubRevisionFile', ParentType, ContextType>;
};

export type SourceCodeManagementRevisionFileLineResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SourceCodeManagementRevisionFileLine'] = ResolversParentTypes['SourceCodeManagementRevisionFileLine']> = {
  __resolveType: TypeResolveFn<'GitHubRevisionFileLine', ParentType, ContextType>;
};

export type SourceCodeManagementRevisionFileLineColumnResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SourceCodeManagementRevisionFileLineColumn'] = ResolversParentTypes['SourceCodeManagementRevisionFileLineColumn']> = {
  __resolveType: TypeResolveFn<'GitHubRevisionFileLineColumn', ParentType, ContextType>;
};

export type StackTraceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StackTrace'] = ResolversParentTypes['StackTrace']> = {
  callFrames: Resolver<ReadonlyArray<ResolversTypes['CallFrame']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StepDefinitionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StepDefinition'] = ResolversParentTypes['StepDefinition']> = {
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  keyword: Resolver<ResolversTypes['GherkinStepKeyword'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StepEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StepEvent'] = ResolversParentTypes['StepEvent']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  commandChains: Resolver<ResolversTypes['CommandChainEventConnection'], ParentType, ContextType>;
  definition: Resolver<ResolversTypes['StepDefinition'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nextSnapshot: Resolver<Maybe<ResolversTypes['TestExecutionSnapshot']>, ParentType, ContextType>;
  previousSnapshot: Resolver<Maybe<ResolversTypes['TestExecutionSnapshot']>, ParentType, ContextType>;
  status: Resolver<ResolversTypes['CommandEventStatus'], ParentType, ContextType>;
  testExecution: Resolver<ResolversTypes['TestExecution'], ParentType, ContextType>;
  until: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StepEventConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StepEventConnection'] = ResolversParentTypes['StepEventConnection']> = {
  edges: Resolver<ReadonlyArray<ResolversTypes['StepEventEdge']>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StepEventEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StepEventEdge'] = ResolversParentTypes['StepEventEdge']> = {
  cursor: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  node: Resolver<ResolversTypes['StepEvent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestExecutionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecution'] = ResolversParentTypes['TestExecution']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  environment: Resolver<ResolversTypes['TestExecutionEnvironment'], ParentType, ContextType>;
  events: Resolver<ResolversTypes['TestExecutionEventConnection'], ParentType, ContextType, Partial<TestExecutionEventsArgs>>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rerunOf: Resolver<Maybe<ResolversTypes['TestExecution']>, ParentType, ContextType>;
  reruns: Resolver<ReadonlyArray<ResolversTypes['TestExecution']>, ParentType, ContextType>;
  testRun: Resolver<ResolversTypes['TestRun'], ParentType, ContextType>;
  title: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  until: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestExecutionConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecutionConnection'] = ResolversParentTypes['TestExecutionConnection']> = {
  edges: Resolver<ReadonlyArray<ResolversTypes['TestExecutionEdge']>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestExecutionEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecutionEdge'] = ResolversParentTypes['TestExecutionEdge']> = {
  cursor: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  node: Resolver<ResolversTypes['TestExecution'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestExecutionEnvironmentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecutionEnvironment'] = ResolversParentTypes['TestExecutionEnvironment']> = {
  browser: Resolver<ResolversTypes['BrowserVersion'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestExecutionEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecutionEvent'] = ResolversParentTypes['TestExecutionEvent']> = {
  __resolveType: TypeResolveFn<'CommandChainEvent' | 'CommandEvent' | 'ConsoleLogEvent' | 'HttpNetworkEvent' | 'ScenarioEvent' | 'StepEvent' | 'TestExecutionScreenshot' | 'TestExecutionSnapshot', ParentType, ContextType>;
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

export type TestExecutionScreenshotResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecutionScreenshot'] = ResolversParentTypes['TestExecutionScreenshot']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  testExecution: Resolver<ResolversTypes['TestExecution'], ParentType, ContextType>;
  url: Resolver<ResolversTypes['SignedURL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestExecutionSnapshotResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecutionSnapshot'] = ResolversParentTypes['TestExecutionSnapshot']> = {
  at: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dom: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  testExecution: Resolver<ResolversTypes['TestExecution'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestExecutionStatusResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestExecutionStatus'] = ResolversParentTypes['TestExecutionStatus']> = {
  featureFile: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rerunOfId: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  testName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  testStatus: Resolver<ResolversTypes['TestStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestRunResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestRun'] = ResolversParentTypes['TestRun']> = {
  executions: Resolver<ResolversTypes['TestExecutionConnection'], ParentType, ContextType, Partial<TestRunExecutionsArgs>>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  testCodeRevision: Resolver<Maybe<ResolversTypes['SourceCodeManagementRevision']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestRunConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestRunConnection'] = ResolversParentTypes['TestRunConnection']> = {
  edges: Resolver<ReadonlyArray<ResolversTypes['TestRunEdge']>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestRunEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestRunEdge'] = ResolversParentTypes['TestRunEdge']> = {
  cursor: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  node: Resolver<ResolversTypes['TestRun'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestRunStatusResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestRunStatus'] = ResolversParentTypes['TestRunStatus']> = {
  runStatus: Resolver<ResolversTypes['RunStatus'], ParentType, ContextType>;
  testExecutionStatuses: Resolver<ReadonlyArray<Maybe<ResolversTypes['TestExecutionStatus']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UploadInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UploadInfo'] = ResolversParentTypes['UploadInfo']> = {
  fields: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Field']>>>, ParentType, ContextType>;
  runID: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3RunPath: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Worker'] = ResolversParentTypes['Worker']> = {
  completedAt: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdAt: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  executor: Resolver<ResolversTypes['Executor'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  startedAt: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  status: Resolver<ResolversTypes['WorkerStatus'], ParentType, ContextType>;
  testExecutions: Resolver<ReadonlyArray<Maybe<ResolversTypes['TestExecution']>>, ParentType, ContextType>;
  testRunId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  BrowserVersion: BrowserVersionResolvers<ContextType>;
  CallFrame: CallFrameResolvers<ContextType>;
  ChromiumVersion: ChromiumVersionResolvers<ContextType>;
  CommandChainEvent: CommandChainEventResolvers<ContextType>;
  CommandChainEventConnection: CommandChainEventConnectionResolvers<ContextType>;
  CommandChainEventEdge: CommandChainEventEdgeResolvers<ContextType>;
  CommandEvent: CommandEventResolvers<ContextType>;
  CommandEventConnection: CommandEventConnectionResolvers<ContextType>;
  CommandEventEdge: CommandEventEdgeResolvers<ContextType>;
  CommandEventError: CommandEventErrorResolvers<ContextType>;
  ConsoleEvent: ConsoleEventResolvers<ContextType>;
  ConsoleLogEvent: ConsoleLogEventResolvers<ContextType>;
  Cookie: CookieResolvers<ContextType>;
  CreateApiKeyResponse: CreateApiKeyResponseResolvers<ContextType>;
  CreateTestExecutionResponse: CreateTestExecutionResponseResolvers<ContextType>;
  Cursor: GraphQLScalarType;
  DateTime: GraphQLScalarType;
  Event: EventResolvers<ContextType>;
  Field: FieldResolvers<ContextType>;
  GitActor: GitActorResolvers<ContextType>;
  GitBranch: GitBranchResolvers<ContextType>;
  GitHubActor: GitHubActorResolvers<ContextType>;
  GitHubBranch: GitHubBranchResolvers<ContextType>;
  GitHubOrganization: GitHubOrganizationResolvers<ContextType>;
  GitHubRepository: GitHubRepositoryResolvers<ContextType>;
  GitHubRepositoryOwner: GitHubRepositoryOwnerResolvers<ContextType>;
  GitHubRevision: GitHubRevisionResolvers<ContextType>;
  GitHubRevisionFile: GitHubRevisionFileResolvers<ContextType>;
  GitHubRevisionFileLine: GitHubRevisionFileLineResolvers<ContextType>;
  GitHubRevisionFileLineColumn: GitHubRevisionFileLineColumnResolvers<ContextType>;
  GitHubUser: GitHubUserResolvers<ContextType>;
  GitRepository: GitRepositoryResolvers<ContextType>;
  GitRevision: GitRevisionResolvers<ContextType>;
  GitRevisionFile: GitRevisionFileResolvers<ContextType>;
  GitRevisionFileLine: GitRevisionFileLineResolvers<ContextType>;
  GitRevisionFileLineColumn: GitRevisionFileLineColumnResolvers<ContextType>;
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
  Mutation: MutationResolvers<ContextType>;
  NetworkEvent: NetworkEventResolvers<ContextType>;
  NetworkEventTiming: NetworkEventTimingResolvers<ContextType>;
  Node: NodeResolvers<ContextType>;
  PageInfo: PageInfoResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  ScenarioDefinition: ScenarioDefinitionResolvers<ContextType>;
  ScenarioEvent: ScenarioEventResolvers<ContextType>;
  SignedURL: SignedUrlResolvers<ContextType>;
  SnapshotEvent: SnapshotEventResolvers<ContextType>;
  SourceCodeManagementRepository: SourceCodeManagementRepositoryResolvers<ContextType>;
  SourceCodeManagementRevision: SourceCodeManagementRevisionResolvers<ContextType>;
  SourceCodeManagementRevisionFile: SourceCodeManagementRevisionFileResolvers<ContextType>;
  SourceCodeManagementRevisionFileLine: SourceCodeManagementRevisionFileLineResolvers<ContextType>;
  SourceCodeManagementRevisionFileLineColumn: SourceCodeManagementRevisionFileLineColumnResolvers<ContextType>;
  StackTrace: StackTraceResolvers<ContextType>;
  StepDefinition: StepDefinitionResolvers<ContextType>;
  StepEvent: StepEventResolvers<ContextType>;
  StepEventConnection: StepEventConnectionResolvers<ContextType>;
  StepEventEdge: StepEventEdgeResolvers<ContextType>;
  TestExecution: TestExecutionResolvers<ContextType>;
  TestExecutionConnection: TestExecutionConnectionResolvers<ContextType>;
  TestExecutionEdge: TestExecutionEdgeResolvers<ContextType>;
  TestExecutionEnvironment: TestExecutionEnvironmentResolvers<ContextType>;
  TestExecutionEvent: TestExecutionEventResolvers<ContextType>;
  TestExecutionEventConnection: TestExecutionEventConnectionResolvers<ContextType>;
  TestExecutionEventEdge: TestExecutionEventEdgeResolvers<ContextType>;
  TestExecutionScreenshot: TestExecutionScreenshotResolvers<ContextType>;
  TestExecutionSnapshot: TestExecutionSnapshotResolvers<ContextType>;
  TestExecutionStatus: TestExecutionStatusResolvers<ContextType>;
  TestRun: TestRunResolvers<ContextType>;
  TestRunConnection: TestRunConnectionResolvers<ContextType>;
  TestRunEdge: TestRunEdgeResolvers<ContextType>;
  TestRunStatus: TestRunStatusResolvers<ContextType>;
  URL: GraphQLScalarType;
  UploadInfo: UploadInfoResolvers<ContextType>;
  Worker: WorkerResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = Context> = {
  defer: DeferDirectiveResolver<any, any, ContextType>;
  stream: StreamDirectiveResolver<any, any, ContextType>;
};
