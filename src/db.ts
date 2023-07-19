import { PrismaClient, Organisation } from '@prisma/client';

import {
    PrismaInterface,
    SlugOptionalOrganisationCreateInput,
} from './interfaces/prisma.js';
import { generateSlug } from './util/generateSlug.js';
import config from './config.js';

export default class PrismaDB implements PrismaInterface {
    prisma: PrismaClient = new PrismaClient();

    __construct() {
        if (!config.DB_ENABLED) {
            throw new Error('DB not enabled');
        }
    }

    async createWithSlug(data: SlugOptionalOrganisationCreateInput) {
        const slugifiedName = generateSlug(data.name);
        const slug = await this.getSlug(slugifiedName);
        return this.prisma.organisation.create({
            data: {
                ...data,
                slug: slug,
            },
        });
    }

    async getByApiKey(apiKey: string): Promise<Organisation | null> {
        if (!this.prisma) return null;
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
}
