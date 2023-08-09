import { OrganisationWithoutSlug } from '../interfaces/prisma.js';
import { S3Config, InputMaybe } from '../resolvers/types/generated';
import { Auth } from '../context.js';

import PrismaRepository from './repository.js';

type GetBucketAndPathArgs = Auth | InputMaybe<S3Config> | undefined;

class OrganisationRepository extends PrismaRepository {
    private validateArgs(args: GetBucketAndPathArgs): Auth {
        const auth = args as Auth;

        if (!auth || !auth.organisation) {
            throw new Error('Invalid API key.');
        }

        return auth;
    }

    async getOrganisationFromApiKey(key: string) {
        return this.db.getOrganisationFromApiKey(key);
    }

    async createOrganisation(args: OrganisationWithoutSlug) {
        return this.db.createWithSlug(args);
    }

    getOrganisationIdentifier(args: GetBucketAndPathArgs) {
        const auth = this.validateArgs(args);

        return auth.organisation.slug;
    }

    getBucketAndPath(args: GetBucketAndPathArgs) {
        console.log('Using APIKey and DB');
        const auth = this.validateArgs(args);

        const { s3CustomPath, s3BucketName } = auth.organisation;

        return {
            customerPath: s3CustomPath,
            s3BucketName: s3BucketName,
        };
    }
}

export default OrganisationRepository;
