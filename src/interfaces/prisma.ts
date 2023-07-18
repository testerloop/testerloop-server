import { PrismaClient, Prisma } from '@prisma/client';
import { Organisation } from '@prisma/client';

export type SlugOptionalOrganisationCreateInput = Omit<
    Prisma.OrganisationCreateInput,
    'slug'
> & { slug?: string };

export interface PrismaInterface {
    initialiseClient: () => Promise<PrismaClient | null>;
    createWithSlug: (
        data: SlugOptionalOrganisationCreateInput
    ) => Promise<Organisation | null>;
    getByApiKey: (apiKey: string) => Promise<Organisation | null>;
    getSlug: (slug: string, index?: number) => Promise<string> | null;
}
