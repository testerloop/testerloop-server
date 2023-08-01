import {
    Organisation,
    TestExecution,
    TestRun,
    TestStatus,
    RunStatus,
} from '@prisma/client';

import { S3Config, InputMaybe } from '../resolvers/types/generated';
import { Auth } from '../context.js';
import PrismaDB from '../db.js';
import {
    OrganisationWithoutSlug,
    S3CustomerConfig,
} from '../interfaces/prisma.js';

type GetBucketAndPathArgs = Auth | InputMaybe<S3Config> | undefined;

interface Repository {
    getOrganisationFromApiKey: (key: string) => Promise<Organisation | null>;
    createApiKey: (organisationId: string, name?: string) => Promise<string>,
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

    async getOrganisationFromApiKey(key: string) {
        return this.db.getOrganisationFromApiKey(key);
    }

    async createApiKey(organisationId: string, name?: string | null) {
        return this.db.createApiKey(organisationId, name);
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

    async updateTestRunStatus(
        id: string,
        status: RunStatus,
    ): Promise<TestRun | null> {
        return this.db.prisma.testRun.update({
            where: { id },
            data: { status },
        });
    }

    async getTestRun(runId: string) {
        return this.db.getTestRun(runId);
    }
}

export default new PrismaRepository();
