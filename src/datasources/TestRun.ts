import getPaginatedData from '../util/getPaginatedData.js';

import { BaseDataSource } from './BaseDatasource.js';

export class TestRun extends BaseDataSource {
    async getAll(args: { first?: number | null; after?: string | null }) {
        const { first = null, after = null } = args;
        const organisationId = this.context.auth?.organisation.id;
        if (!organisationId) {
            throw new Error('User is not authenticated.');
        }

        const filteredTestRuns =
            await this.context.repository.testRun.getRunsByOrganisationId(
                organisationId,
            );

        return getPaginatedData(filteredTestRuns, { first, after });
    }
}
