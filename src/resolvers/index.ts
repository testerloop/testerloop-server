import { DateTimeScalar } from 'graphql-date-scalars';
import { edgeResolvers } from '../util/connection.js';
import { Resolvers } from './types/generated.js';
import Cursor from './scalars/Cursor.js';
import ConsoleLogEvent from './ConsoleLogEvent.js';
import Query from './Query.js';
import PageInfo from './PageInfo.js';
import TestExecution from './TestExecution.js';
import TestExecutionEventConnection from './TestExecutionEventConnection.js';
import HttpNetworkEvent from './HttpNetworkEvent.js';
import Cookie from './Cookie.js';
import HttpHeaders from './HttpHeaders.js';
import HttpNetworkEventInitiator from './HttpNetworkEventInitiator.js';
import HttpNetworkRequest from './HttpNetworkRequest.js';
import HttpNetworkRequestUrl from './HttpNetworkRequestUrl.js';
import HttpNetworkResponse from './HttpNetworkResponse.js';
import HttpNetworkTimings from './HttpNetworkTimings.js';
import HttpRequestBody from './HttpRequestBody.js';
import HttpResponseBody from './HttpResponseBody.js';
import HttpResponseBodyChunk from './HttpResponseBodyChunk.js';
import KeyValuePair from './KeyValuePair.js';
import NetworkEventTiming from './NetworkEventTiming.js';
import TestRun from './TestRun.js';
import GitHubBranch from './GitHubBranch.js';
import GitHubActor from './GitHubActor.js';
import GitHubRepository from './GitHubRepository.js';
import GitHubOrganization from './GitHubOrganization.js';
import GitHubRevision from './GitHubRevision.js';
import GitHubUser from './GitHubUser.js'; 
import TestExecutionEnvironment from './TestExecutionEnvironment.js';
import ChromiumVersion from './ChromiumVersion.js';
import URL from './scalars/URL.js';
import GitHubRepositoryOwner from './GitHubRepositoryOwner.js';
import StepEventConnection from './StepEventConnection.js';
import ScenarioEvent from './ScenarioEvent.js';
import CommandEventConnection from './CommandEventConnection.js';
import CommandChainEvent from './CommandChainEvent.js';
import CommandChainEventConnection from './CommandChainEventConnection.js';
import CommandEvent from './CommandEvent.js';
import CommandEventError from './CommandEventError.js';
import StepDefinition from './StepDefinition.js';
import ScenarioDefinition from './ScenarioDefinition.js';
import StepEvent from './StepEvent.js';
import TestExecutionSnapshot from './TestExecutionSnapshot.js';
import GitHubRevisionFileLines from './GitHubRevisionFileLine.js';
import GitHubRevisionFile from './GitHubRevisionFile.js';
import GitHubRevisionFileLine from './GitHubRevisionFileLine.js';
import GitHubRevisionFileLineColumn from './GitHubRevisionFileLineColumn.js';

const interfaceResolvers = {
    __resolveType<T extends String>(parent: { __typename: T }): T {
        return parent.__typename;
    }
}

const resolvers: Resolvers = {
    ConsoleEvent: interfaceResolvers,
    ConsoleLogEvent,
    Cursor,
    DateTime: DateTimeScalar,
    Event: interfaceResolvers,
    InstantaneousEvent: interfaceResolvers,
    IntervalEvent: interfaceResolvers,
    Node: interfaceResolvers,
    TestExecution,
    TestExecutionEvent: interfaceResolvers,
    TestExecutionEventConnection,
    TestExecutionEventEdge: edgeResolvers,
    PageInfo,
    Query,
    NetworkEvent: interfaceResolvers,
    HttpBody: interfaceResolvers,
    HttpNetworkEvent,
    Cookie,
    HttpHeaders,
    HttpNetworkEventInitiator,
    HttpNetworkRequest,
    HttpNetworkRequestUrl,
    HttpNetworkResponse,
    HttpNetworkTimings,
    HttpRequestBody,
    HttpResponseBody,
    HttpResponseBodyChunk,
    KeyValuePair,
    NetworkEventTiming,
    TestRun,
    GitHubBranch,
    GitBranch: interfaceResolvers,
    GitActor: interfaceResolvers,
    GitRepository: interfaceResolvers,
    GitRevision: interfaceResolvers,
    GitRevisionFile: interfaceResolvers,
    GitRevisionFileLineColumn: interfaceResolvers,
    GitRevisionFileLine: interfaceResolvers,
    GitHubRevisionFileLineColumn,
    GitHubRevisionFileLine,
    GitHubRevisionFile,
    SourceCodeManagementRevisionFileLine: interfaceResolvers,
    SourceCodeManagementRevisionFileLineColumn: interfaceResolvers,
    SourceCodeManagementRevisionFile: interfaceResolvers,
    SourceCodeManagementRepository: interfaceResolvers,
    SourceCodeManagementRevision: interfaceResolvers,
    StepEventConnection,
    StepEventEdge: edgeResolvers,
    StepEvent,
    ScenarioEvent,
    CommandEvent,
    CommandEventConnection,
    CommandEventError,
    CommandEventEdge: edgeResolvers,
    CommandChainEventEdge: edgeResolvers,
    CommandChainEvent,
    CommandChainEventConnection,
    StepDefinition,
    ScenarioDefinition,
    GitHubActor,
    GitHubRepository,
    GitHubOrganization,
    GitHubRevision,
    GitHubUser,
    GitHubRepositoryOwner,
    TestExecutionEnvironment,
    BrowserVersion: interfaceResolvers,
    ChromiumVersion,
    URL,
    TestExecutionSnapshot,
};

export default resolvers;
