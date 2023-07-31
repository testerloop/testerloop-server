import { PrismaClient, Organisation } from '@prisma/client';

import {
    PrismaInterface,
    OrganisationWithoutSlug,
} from './interfaces/prisma.js';
import { generateSlug } from './util/generateSlug.js';

export default class PrismaDB implements PrismaInterface {
    prisma: PrismaClient = new PrismaClient();

    async createWithSlug(data: OrganisationWithoutSlug) {
        const slugifiedName = generateSlug(data.name);
        const slug = await this.getSlug(slugifiedName);
        return this.prisma.organisation.create({
            data: { ...data, slug },
        });
    }

    async getByApiKey(apiKey: string): Promise<Organisation | null> {
        const apiKeyResult = await this.prisma.apiKey.findFirst({
            where: { apiKey },
            include: { organisation: true },
        });
        if (!apiKeyResult) throw new Error('Invalid API key provided');

        if (!apiKeyResult.isEnabled) {
            throw new Error(
                'Your API key is not enabled. Please renew your subscription or contact Testerloop support.',
            );
        }
        return apiKeyResult.organisation;
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
        return this.prisma.testRun.findUnique({
            where: { id: runId },
            include: { testExecutions: true },
        });
    }
}
