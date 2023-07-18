import { PrismaClient, Organisation } from '@prisma/client';
import {
    PrismaInterface,
    SlugOptionalOrganisationCreateInput,
} from './interfaces/prisma.js';
import { generateSlug } from './util/generateSlug.js';

export class PrismaDB implements PrismaInterface {
    prisma: PrismaClient | null = null;

    async initialiseClient() {
        this.prisma = new PrismaClient();
        return this.prisma;
    }

    async createWithSlug(data: SlugOptionalOrganisationCreateInput) {
        if (!this.prisma) return null;

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
                'Your API key is not enabled. Please renew your subscription or contact Testerloop support.'
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

export class NoPrismaDB implements PrismaInterface {
    private throwError(): never {
        throw new Error('Database operations are not allowed');
    }

    async initialiseClient(): Promise<PrismaClient | null> {
        this.throwError();
    }

    async createWithSlug(
        data: SlugOptionalOrganisationCreateInput
    ): Promise<Organisation | null> {
        this.throwError();
    }

    async getByApiKey(apiKey: string): Promise<Organisation | null> {
        this.throwError();
    }

    async getSlug(slug: string, index: number = 0): Promise<string> {
        this.throwError();
    }
}

export const prismaClient: PrismaInterface =
    process.env.ENABLE_DB === 'true' ? new PrismaDB() : new NoPrismaDB();
