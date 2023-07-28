import { Prisma, Organisation, ApiPermissions } from '@prisma/client';

export type OrganisationWithoutSlug = Omit<
    Prisma.OrganisationCreateInput,
    'slug'
> & { slug?: string };

export interface S3CustomerConfig {
    s3BucketName: string;
    customerPath: string;
}

export interface ApiKeyResult {
    organisation: Organisation;
    apiKey: string;
    permissions: ApiPermissions[];
}

export interface PrismaInterface {
    createWithSlug: (
        data: OrganisationWithoutSlug,
    ) => Promise<Organisation | null>;
    getByApiKey: (apiKey: string) => Promise<ApiKeyResult | null>;
    getSlug: (slug: string, index?: number) => Promise<string> | null;
}
