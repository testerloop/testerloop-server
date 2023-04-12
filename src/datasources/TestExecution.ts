import { Context } from '../context.js';
import config from '../config.js';
import { HttpNetworkEventResourceType, TestExecutionEventFilterInput, TestExecutionEventType } from '../resolvers/types/generated.js';
import S3Service from '../S3Service.js';
import getPaginatedData from '../util/getPaginatedData.js';

export class TestExecution {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async getById(id: string) {
        const bucketName = config.AWS_BUCKET_NAME;
        const [runId, requestId] = id.split('/');
        const results = await S3Service.getObject(bucketName, `${runId}/${requestId}/cypress/results.json`) as {startedTestsAt: string, endedTestsAt: string};

        if (results) {
            return {
                id,
                at: new Date(results.startedTestsAt),
                until: new Date(results.endedTestsAt),
            };
        }

        return null;
    }

    async getEvents(id: string, args: {
        first?: number | null, after?: string | null, filter?: TestExecutionEventFilterInput | null;
    }) {;
        const filters = args?.filter;
        const consoleFilters = filters?.consoleFilter;
        const networkFilters = filters?.networkFilter;

        const [logs, httpNetworkEvent, steps] = await Promise.all([
            this.context.dataSources.consoleEvent.getLogsByTestExecutionId(id),
            this.context.dataSources.networkEvent.getNetworkEventsByTestExecutionId(id),
            this.context.dataSources.stepEvent.getStepsByTestExecutionId(id)
          ]);

        let data = ([
            ...Object.values(logs),
            ...Object.values(httpNetworkEvent),
            ...Object.values(steps)
        ]).sort((a, b) => {
            return a.at.getTime() - b.at.getTime();
        }).filter((evt) => {
            return filters?.type?.some((type) => {
                switch (type) {
                    case TestExecutionEventType.Console: {
                        if(evt.__typename !== 'ConsoleLogEvent') return false;
                        const { logLevel, message } = evt;

                        if (
                            consoleFilters?.logLevel &&
                            !consoleFilters.logLevel?.includes(logLevel)
                        ) {
                            return false;
                        }
                        if (
                            consoleFilters?.logSearch &&
                            !message
                                ?.toLowerCase()
                                .includes(
                                    consoleFilters.logSearch.toLowerCase()
                                )
                        ) {
                            return false;
                        }

                        return true;
                    }
                    case TestExecutionEventType.Network: {
                        if(evt.__typename !== 'HttpNetworkEvent') return false;

                        const { request, resourceType, response } = evt;

                        if (
                            networkFilters?.urlSearch &&
                            !(request.url.url.toLowerCase()).includes(networkFilters?.urlSearch.toLowerCase())
                        ) {
                            return false;
                        }

                        if(
                            networkFilters?.resourceType &&
                            !networkFilters?.resourceType.includes(resourceType.toUpperCase() as HttpNetworkEventResourceType)
                        ) {
                            return false;
                        }

                        if(
                            networkFilters?.status
                        ) {
                            const { gte, lte } = networkFilters?.status;

                            if(gte != null && !(response.status >= gte)) {
                                return false;
                            }

                            if(lte != null && !(response.status <= lte)){
                                return false;
                            }

                            return true;
                        }


                        return evt.__typename === 'HttpNetworkEvent';
                    }
                    case TestExecutionEventType.Step: {
                        if(evt.__typename !== 'StepEvent') return false;

                        return true;
                    }
                    // case TestExecutionEventType.Command: {
                    //     if(evt.__typename !== 'CommandEvent') return false;

                    //     const { groupStart } = evt;

                    //     if(groupStart){
                    //         return false;
                    //     }

                    //     return true;
                    // }
                    default: {
                        throw new Error(`Type ${type} not implemented`);
                    }
                }
            }) ?? true
        });

        return getPaginatedData(data, { first: args.first, after: args.after });
    }
}
