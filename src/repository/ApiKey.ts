import PrismaRepository from './repository.js';

class ApiKeyRepository extends PrismaRepository {
    async createApiKey(organisationId: string, name?: string | null) {
        return await this.db.createApiKey(organisationId, name);
    }
}

export default ApiKeyRepository;
