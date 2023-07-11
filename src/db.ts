import { Prisma } from '@prisma/client';
import { generateSlug } from './util/generateSlug.js';
import prisma from '../prisma/basePrismaClient.js';

type SlugOptionalOrganisationCreateInput = Omit<
    Prisma.OrganisationCreateInput,
    'slug'
> & { slug?: string };

const db = prisma.$extends({
    name: 'slugify',
    model: {
        organisation: {
            async createWithSlug(data: SlugOptionalOrganisationCreateInput) {
                const slugifiedName = await generateSlug(data.name);
                return prisma.organisation.create({
                    data: {
                        ...data,
                        slug: slugifiedName,
                    },
                });
            },
            async getByApiKey(apiKey: string) {
                console.log('Searching for API Key: ', apiKey);
                const apiKeyRecord = await prisma.apiKey.findFirst({
                    where: { apiKey },
                    include: { organisation: true },
                });
                console.log('API Key Record: ', apiKeyRecord);
                return apiKeyRecord?.organisation;
            },
        },
    },
});

export default db;
