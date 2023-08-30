import S3Service from '../S3Service.js';
import getPaginatedData from '../util/getPaginatedData.js';

import { BaseDataSource } from './BaseDatasource.js';

export class TestRun extends BaseDataSource {
    async getAll(args: { first?: number | null; after?: string | null }) {
        const results = await S3Service.listSubFolders(
            this.bucketName,
            `${this.bucketPath}/`,
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
}
