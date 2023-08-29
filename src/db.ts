import { PrismaClient, Organisation, Prisma } from '@prisma/client';

import { generateSlug } from './util/generateSlug.js';
import apiKeyService from './ApiKeyService.js';

export type OrganisationWithoutSlug = Omit<
    Prisma.OrganisationCreateInput,
    'slug' | 's3CustomPath'
> & { slug?: string; s3CustomPath?: string };

export default class PrismaDB {
    prisma: PrismaClient = new PrismaClient();

    async createWithSlug(data: OrganisationWithoutSlug) {
        const slugifiedName = generateSlug(data.name);
        const slug = await this.getSlug(slugifiedName);
        return this.prisma.organisation.create({
            data: { ...data, s3CustomPath: slug, slug },
        });
    }

    async getOrganisationFromApiKey(key: string): Promise<Organisation | null> {
        const prefix = key.split('.')[0];
        const apiKeyObj = await this.prisma.apiKey.findFirst({
            where: {
                prefix,
            },
            include: { organisation: true },
        });

        if (!apiKeyObj) {
            throw new Error('Invalid API key provided');
        }

        const isValid = await apiKeyService.verifyKey(key, apiKeyObj.hashedKey);

        if (!isValid) {
            throw new Error('Invalid API key provided');
        }

        if (!apiKeyObj.isEnabled) {
            throw new Error(
                'Your API key is not enabled. Please renew your subscription or contact Testerloop support.',
            );
        }
        return apiKeyObj.organisation;
    }

    async createApiKey(
        organisationId: string,
        name?: string | null,
        email?: string | null,
    ): Promise<string> {
        const { prefix, key, hashedKey } = await apiKeyService.generateKey();
        await this.prisma.apiKey.create({
            data: {
                prefix,
                hashedKey,
                organisationId,
                name: name ?? null,
            },
        });
        if (email) {
            apiKeyService.sendEmail(email, key);
        }
        return key;
    }

    async getSlug(slug: string, index: number = 0): Promise<string> {
        if (!this.prisma) return slug;

        const currentSlug = index === 0 ? slug : `${slug}-${index}`;
        const existingOrganization = await this.prisma.organisation.findUnique({
            where: { slug: currentSlug },
        });

        if (!existingOrganization) {
            return currentSlug;
        }

        return this.getSlug(slug, index + 1);
    }

    async getTestRun(runId: string) {
        const testRun = await this.prisma.testRun.findUnique({
            where: { id: runId },
            include: { testExecutions: true },
        });
        if (!testRun) throw new Error('Run not found.');
        return testRun;
    }
}
