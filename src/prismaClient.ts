import { PrismaClient, Prisma } from '@prisma/client';
import slugify from 'slugify';
const prisma = new PrismaClient();

type SlugOptionalOrganisationCreateInput = Omit<
    Prisma.OrganisationCreateInput,
    'slug'
> & { slug?: string };

const db = prisma.$extends({
    name: 'slugify',
    model: {
        organisation: {
            async createWithSlug(data: SlugOptionalOrganisationCreateInput) {
                const slugifiedNameBase = slugify(data.name, {
                    lower: true,
                    strict: true,
                });
                let slugifiedName = slugifiedNameBase;
                let existingOrganization = await prisma.organisation.findUnique(
                    {
                        where: { slug: slugifiedName },
                    }
                );

                if (existingOrganization) {
                    let suffix = 1;
                    do {
                        slugifiedName = `${slugifiedNameBase}-${suffix++}`;
                        existingOrganization =
                            await prisma.organisation.findUnique({
                                where: { slug: slugifiedName },
                            });
                    } while (existingOrganization);
                }

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
