import PrismaRepository from './repository.js';

class ApiKeyRepository extends PrismaRepository {
    async createApiKey(
        organisationId: string,
        name?: string | null,
        email?: string | null,
    ) {
        return await this.db.createApiKey(organisationId, name, email);
    }
}

export default ApiKeyRepository;
