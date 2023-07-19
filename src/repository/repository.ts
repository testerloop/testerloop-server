import { Organisation } from '@prisma/client';
import { S3Config, InputMaybe } from '../resolvers/types/generated';
import { Auth } from '../context.js';
import PrismaDB from '../db.js';
import config from '../config.js';
import { SlugOptionalOrganisationCreateInput } from '../interfaces/prisma.js';

type GetBucketAndPathArgs = Auth | InputMaybe<S3Config> | undefined;

export interface S3CustomerConfig {
    s3BucketName: string;
    customerPath: string;
}

interface Repository {
    getByApiKey: (apiKey: string) => Promise<Organisation | null>;
    getBucketAndPath: (args: GetBucketAndPathArgs) => S3CustomerConfig;
    getOrganisationIdentifier: (args: GetBucketAndPathArgs) => string;
    createOrganisation: (args: SlugOptionalOrganisationCreateInput) => Promise<Organisation | null>;
}

class PrismaRepository implements Repository {
    db: PrismaDB = new PrismaDB();

    __construct() {
        console.log('Starting PrismaRepository');
    }

    validateArgs(args: GetBucketAndPathArgs): Auth {
        const auth = args as Auth;

        if (!auth || !auth.organisation) {
            throw new Error('Invalid API key.');
        }

        return auth;
    }

    async getByApiKey(apiKey: string) {
        return this.db.getByApiKey(apiKey);
    }

    async createOrganisation(args: SlugOptionalOrganisationCreateInput) {
        return this.db.createWithSlug(args);
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

    getOrganisationIdentifier(args: GetBucketAndPathArgs) {
        const auth = this.validateArgs(args);

        return auth.organisation.slug;
    }
}

class ConfigRepository implements Repository {
    __construct() {
        console.log('Starting ConfigRepository');
    }

    notImplementedException() {
        throw new Error('notImplementedException');
    }

    validateArgs(args: GetBucketAndPathArgs): S3Config {
        const s3Config = args as S3Config;

        if (!s3Config || !s3Config.customerPath || !s3Config.bucket) {
            throw new Error(
                'Invalid configuration. Please provide s3BucketName and customerPath.'
            );
        }

        return s3Config;
    }

    async createOrganisation(_: SlugOptionalOrganisationCreateInput): Promise<any> {
        this.notImplementedException();
    }

    async getByApiKey(_: string): Promise<any> {
        this.notImplementedException();
    }
    getBucketAndPath(args: GetBucketAndPathArgs) {
        const s3Config = this.validateArgs(args);
        console.log('Using s3Config');

        if (!s3Config.customerPath || !s3Config.bucket) {
          throw new Error('Invalid configuration. Please provide s3BucketName and customerPath.');
        }

        const { customerPath, bucket } = s3Config;

        return { s3BucketName: bucket, customerPath };
    }

    getOrganisationIdentifier(args: GetBucketAndPathArgs) {
        const s3Config = this.validateArgs(args);

        return s3Config.customerPath;
    }
}

export default config.DB_ENABLED
    ? new PrismaRepository()
    : new ConfigRepository();
