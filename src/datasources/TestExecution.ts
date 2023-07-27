import { Context } from '../context.js';
import config from '../config.js';
import {
    CommandEventStatus,
    ConsoleLogLevel,
    HttpNetworkEventResourceType,
    TestExecutionEventFilterInput,
    TestExecutionEventType,
} from '../resolvers/types/generated.js';
import S3Service from '../S3Service.js';
import getPaginatedData from '../util/getPaginatedData.js';

export class TestExecution {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async getByTestRunId(
        id: string,
        args: {
            first?: number | null;
            after?: string | null;
        },
    ) {
        const bucketName = config.AWS_BUCKET_NAME;
        const bucketPath = config.AWS_BUCKET_PATH;
        const results = await S3Service.listSubFolders(
            bucketName,
            `${bucketPath}${id}/`,
        );

        const testExecutionIds = results
            .filter((folder) =>
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
                    folder,
                ),
            )
            .map((folder) => ({ id: folder }));

        return getPaginatedData(testExecutionIds, {
            first: args.first,
            after: args.after,
        });
    }

    async getById(id: string) {
        const bucketName = config.AWS_BUCKET_NAME;
        const bucketPath = config.AWS_BUCKET_PATH;
        const [runId, requestId] = id.split('/');
        const results = (await S3Service.getObject(
            bucketName,
            `${bucketPath}${runId}/${requestId}/cypress/results.json`,
        )) as { startedTestsAt: string; endedTestsAt: string };

        if (results) {
            return {
                id,
                at: new Date(results.startedTestsAt),
                until: new Date(results.endedTestsAt),
            };
        }

        return null;
    }

    async getEvents(
        id: string,
        args: {
            first?: number | null;
            after?: string | null;
            filter?: TestExecutionEventFilterInput | null;
        },
    ) {
        const filters = args?.filter;
        const consoleFilters = filters?.consoleFilter;
        const networkFilters = filters?.networkFilter;
        const commandFilters = filters?.commandFilter;

        const data = (
            await Promise.all(
                Object.entries({
                    [TestExecutionEventType.Console]: () =>
                        this.context.dataSources.consoleEvent.getLogsByTestExecutionId(
                            id,
                        ),
                    [TestExecutionEventType.Network]: () =>
                        this.context.dataSources.networkEvent.getNetworkEventsByTestExecutionId(
                            id,
                        ),
                    [TestExecutionEventType.Step]: () =>
                        this.context.dataSources.stepEvent.getStepsByTestExecutionId(
                            id,
                        ),
                    [TestExecutionEventType.Command]: () =>
                        this.context.dataSources.commandEvent.getCommandsByTestExecutionId(
                            id,
                        ),
                    [TestExecutionEventType.TestPart]: () =>
                        this.context.dataSources.scenarioEvent.getScenarioEventByTestExecutionId(
                            id,
                        ),
                    [TestExecutionEventType.Screenshot]: () =>
                        this.context.dataSources.screenshot.getScreenshotsByTestExecutionId(
                            id,
                        ),
                }).map(
                    async ([type, fn]): Promise<
                        Awaited<ReturnType<typeof fn>>[string][]
                    > => {
                        if (
                            filters?.type?.includes(
                                type as TestExecutionEventType,
                            ) ??
                            true
                        )
                            return Object.values(await fn());
                        return [];
                    },
                ),
            )
        )
            .flat()
            .sort((a, b) => {
                return a.at.getTime() - b.at.getTime();
            })
            .filter((evt) => {
                return (
                    filters?.type?.some((type) => {
                        switch (type) {
                            case TestExecutionEventType.Console: {
                                if (evt.__typename !== 'ConsoleLogEvent')
                                    return false;
                                const { logLevel, message } = evt;

                                let mappedLogLevel: ConsoleLogLevel;
                                switch (logLevel) {
                                    case 'debug':
                                    case 'log':
                                        mappedLogLevel = ConsoleLogLevel.Log;
                                        break;
                                    case 'info':
                                        mappedLogLevel = ConsoleLogLevel.Info;
                                        break;
                                    case 'warning':
                                        mappedLogLevel = ConsoleLogLevel.Warn;
                                        break;
                                    case 'error':
                                        mappedLogLevel = ConsoleLogLevel.Error;
                                        break;
                                    default:
                                        const _: never = logLevel;
                                        throw new Error(
                                            `logLevel ${logLevel} not mappable`,
                                        );
                                }

                                if (
                                    consoleFilters?.logLevel &&
                                    !consoleFilters.logLevel?.includes(
                                        mappedLogLevel,
                                    )
                                ) {
                                    return false;
                                }
                                if (
                                    consoleFilters?.logSearch &&
                                    !message
                                        ?.toLowerCase()
                                        .includes(
                                            consoleFilters.logSearch.toLowerCase(),
                                        )
                                ) {
                                    return false;
                                }

                                return true;
                            }
                            case TestExecutionEventType.Network: {
                                if (evt.__typename !== 'HttpNetworkEvent')
                                    return false;

                                const { request, resourceType, response } = evt;

                                if (
                                    networkFilters?.urlSearch &&
                                    !request.url.url
                                        .toLowerCase()
                                        .includes(
                                            networkFilters?.urlSearch.toLowerCase(),
                                        )
                                ) {
                                    return false;
                                }

                                if (
                                    networkFilters?.resourceType &&
                                    !networkFilters?.resourceType.includes(
                                        resourceType.toUpperCase() as HttpNetworkEventResourceType,
                                    )
                                ) {
                                    return false;
                                }

                                if (networkFilters?.status) {
                                    const { gte, lte } = networkFilters?.status;

                                    if (
                                        gte != null &&
                                        !(response.status >= gte)
                                    ) {
                                        return false;
                                    }

                                    if (
                                        lte != null &&
                                        !(response.status <= lte)
                                    ) {
                                        return false;
                                    }

                                    return true;
                                }

                                return evt.__typename === 'HttpNetworkEvent';
                            }
                            case TestExecutionEventType.Step: {
                                if (evt.__typename !== 'StepEvent')
                                    return false;

                                return true;
                            }
                            case TestExecutionEventType.Command: {
                                if (evt.__typename !== 'CommandEvent')
                                    return false;

                                const { state } = evt;

                                if (commandFilters?.status) {
                                    let status;
                                    switch (state) {
                                        case 'failed':
                                            status = CommandEventStatus.Failed;
                                            break;
                                        case 'passed':
                                            status = CommandEventStatus.Success;
                                            break;
                                        default:
                                            throw new Error(
                                                `State ${state} is not a valid state`,
                                            );
                                    }
                                    if (
                                        !commandFilters?.status.includes(status)
                                    ) {
                                        return false;
                                    }
                                }

                                return true;
                            }
                            case TestExecutionEventType.TestPart: {
                                if (evt.__typename !== 'ScenarioEvent')
                                    return false;

                                return true;
                            }
                            case TestExecutionEventType.Screenshot: {
                                if (
                                    evt.__typename !== 'TestExecutionScreenshot'
                                )
                                    return false;

                                return true;
                            }
                            default: {
                                throw new Error(`Type ${type} not implemented`);
                            }
                        }
                    }) ?? true
                );
            });

        return getPaginatedData(data, { first: args.first, after: args.after });
    }
}
