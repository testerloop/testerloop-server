import config from 'src/config.js';

import { OrganisationWithoutSlug } from '../db.js';
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

    async createOrganisation(args: Partial<OrganisationWithoutSlug>) {
        if (!args.name) {
            throw new Error('Name must be provided for the organisation.');
        }

        const defaultArgs: OrganisationWithoutSlug = {
            name: args.name,
            s3BucketName: config.AWS_BUCKET_NAME,
            s3Region: config.AWS_BUCKET_REGION,
            s3CustomPath: config.AWS_BUCKET_PATH,
            ...args,
        };

        return this.db.createWithSlug(defaultArgs);
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
