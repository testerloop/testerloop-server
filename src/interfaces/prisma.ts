import { Prisma, Organisation } from '@prisma/client';

export type OrganisationWithoutSlug = Omit<
    Prisma.OrganisationCreateInput,
    'slug'
> & { slug?: string };

export interface PrismaInterface {
    createWithSlug: (
        data: OrganisationWithoutSlug,
    ) => Promise<Organisation | null>;
    getByApiKey: (apiKey: string) => Promise<Organisation | null>;
    getSlug: (slug: string, index?: number) => Promise<string> | null;
}
