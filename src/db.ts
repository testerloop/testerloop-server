import { Prisma } from '@prisma/client';

import prisma from '../prisma/basePrismaClient.js';

import { generateSlug } from './util/generateSlug.js';

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
                return prisma.apiKey.findFirst({
                    where: { apiKey },
                    include: { organisation: true },
                });
            },
        },
    },
});

export default db;
