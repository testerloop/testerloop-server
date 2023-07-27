import {
    Organisation,
    TestExecution,
    TestRun,
    TestStatus,
} from '@prisma/client';

import { S3Config, InputMaybe } from '../resolvers/types/generated';
import { Auth } from '../context.js';
import PrismaDB from '../db.js';
import config from '../config.js';
import { OrganisationWithoutSlug } from '../interfaces/prisma.js';

type GetBucketAndPathArgs = Auth | InputMaybe<S3Config> | undefined;

export interface S3CustomerConfig {
    s3BucketName: string;
    customerPath: string;
}
interface Repository {
    getByApiKey: (apiKey: string) => Promise<Organisation | null>;
    getBucketAndPath: (args: GetBucketAndPathArgs) => S3CustomerConfig;
    getOrganisationIdentifier: (args: GetBucketAndPathArgs) => string;
    createOrganisation: (
        args: OrganisationWithoutSlug,
    ) => Promise<Organisation | null>;
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

    async createOrganisation(args: OrganisationWithoutSlug) {
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

    async getTestExecutionByGroupIdAndRunId(
        testExecutionGroupId: string,
        runID: string,
    ) {
        return this.db.prisma.testExecution.findFirst({
            where: {
                testExecutionGroupId,
                testRunId: runID,
            },
        });
    }

    async createTestExecution(args: TestExecution) {
        const { testExecutionGroupId, testRunId } = args;

        const testExecutionGroup =
            await this.db.prisma.testExecutionGroup.findUnique({
                where: { id: testExecutionGroupId },
            });

        if (!testExecutionGroup) {
            await this.db.prisma.testExecutionGroup.create({
                data: { id: testExecutionGroupId },
            });
        }

        const rerunOf = await this.getTestExecutionByGroupIdAndRunId(
            testExecutionGroupId,
            testRunId,
        );

        if (rerunOf) {
            args.rerunOfId = rerunOf.id;
        }

        return this.db.prisma.testExecution.create({ data: args });
    }

    async createTestRun(args: TestRun) {
        return this.db.prisma.testRun.create({ data: args });
    }

    async getRerunOf(id: string): Promise<TestExecution | null> {
        const execution = await this.db.prisma.testExecution.findUnique({
            where: { id },
            include: {
                testRun: true,
                rerunOf: true,
            },
        });
        return execution?.rerunOf ?? null;
    }

    async getTestExecutionById(id: string): Promise<TestExecution | null> {
        return this.db.prisma.testExecution.findUnique({ where: { id } });
    }

    async getRerunsByTestId(testExecutionId: string) {
        const reruns = await this.db.prisma.testExecution.findMany({
            where: {
                rerunOfId: testExecutionId,
            },
        });
        return reruns;
    }

    async updateTestExecutionResult(
        id: string,
        result: TestStatus,
        until: Date,
    ): Promise<TestExecution | null> {
        return this.db.prisma.testExecution.update({
            where: { id },
            data: { result, until },
        });
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
                'Invalid configuration. Please provide s3BucketName and customerPath.',
            );
        }

        return s3Config;
    }

    getBucketAndPath(args: GetBucketAndPathArgs) {
        const s3Config = this.validateArgs(args);
        console.log('Using s3Config');

        if (!s3Config.customerPath || !s3Config.bucket) {
            throw new Error(
                'Invalid configuration. Please provide s3BucketName and customerPath.',
            );
        }

        const { customerPath, bucket } = s3Config;

        return { s3BucketName: bucket, customerPath };
    }

    getOrganisationIdentifier(args: GetBucketAndPathArgs) {
        const s3Config = this.validateArgs(args);

        return s3Config.customerPath;
    }

    createOrganisation(
        _: OrganisationWithoutSlug,
    ): Promise<Organisation | null> {
        this.notImplementedException();
        return Promise.resolve(null);
    }

    getByApiKey(_: string): Promise<Organisation | null> {
        this.notImplementedException();
        return Promise.resolve(null);
    }

    getTestExecutionByGroupIdAndRunId(_: string, __: string) {
        this.notImplementedException();
    }

    createTestExecution(_: TestExecution) {
        this.notImplementedException();
    }

    createTestRun(_: TestRun) {
        this.notImplementedException();
    }

    getRerunOf(_: string) {
        this.notImplementedException();
    }

    getTestExecutionById(_: string) {
        this.notImplementedException();
    }
    getRerunsByTestId(_: string) {
        this.notImplementedException();
    }
    updateTestExecutionResult(
        _: string,
        __: TestStatus,
        ___: Date,
    ): Promise<TestExecution | null> {
        this.notImplementedException();
        return Promise.resolve(null);
    }
}

export default config.DB_ENABLED
    ? new PrismaRepository()
    : new ConfigRepository();
