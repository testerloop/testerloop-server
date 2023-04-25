import { Context } from '../context.js';
import config from '../config.js';
import { CommandEventStatus, HttpNetworkEventResourceType, TestExecutionEventFilterInput, TestExecutionEventType } from '../resolvers/types/generated.js';
import S3Service from '../S3Service.js';
import getPaginatedData from '../util/getPaginatedData.js';

export class TestRun {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async getAll(args: {
        first?: number | null, after?: string | null;
    }) {
        const bucketName = config.AWS_BUCKET_NAME;
        const results = await S3Service.listSubFolders(bucketName, '');

        const testExecutionIds = results
            .map((folder) => ({
                id: folder.split('/')[0]
            }))
            .filter(({ id }) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id));

        return getPaginatedData(testExecutionIds, { first: args.first, after: args.after });
    }
}
