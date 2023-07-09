import { Prisma } from '@prisma/client';
import { generateSlug } from './util/generateSlug';
import prisma from 'prisma/basePrismaClient';

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
        },
    },
});

export default db;
