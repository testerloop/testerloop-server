import config from '../config.js';
import S3Service from '../S3Service.js';
import getPaginatedData from '../util/getPaginatedData.js';
import repository from '../repository/index.js';
import { Context } from '../context.js';

const { AWS_BUCKET_NAME, AWS_BUCKET_PATH } = config;

interface Args {
    first?: number | null;
    after?: string | null;
    organisationId: string | null;
}

export class TestRun {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }
    private isValidUUID(folder: string): boolean {
        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
        return uuidRegex.test(folder);
    }

    async getAll(args: Args) {
        const { organisationId, first, after } = args;

        const filteredTestRuns =
            await repository.testRun.getRunsByOrganisationId(organisationId!);
        const filteredTestRunIds = new Set(
            filteredTestRuns.map((run) => run.id),
        );

        const results = await S3Service.listSubFolders(
            AWS_BUCKET_NAME,
            `${AWS_BUCKET_PATH}`,
        );

        const testExecutionIds = results
            .filter(this.isValidUUID)
            .map((folder) => ({ id: folder }))
            .filter((execution) => filteredTestRunIds.has(execution.id));

        return getPaginatedData(testExecutionIds, { first, after });
    }
}
