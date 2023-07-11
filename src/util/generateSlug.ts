import slugify from 'slugify';
import prisma from '../../prisma/basePrismaClient.js';

export async function getSlug(slug: string, index: number = 0): Promise<string> {
    const currentSlug = index === 0 ? slug : `${slug}-${index}`;
    const existingOrganization = await prisma.organisation.findUnique({
        where: { slug: currentSlug },
    });

    if (!existingOrganization) {
        return currentSlug;
    }

    return getSlug(slug, index + 1);
}

export function generateSlug(name: string) {
    const slugifiedNameBase = slugify(name, {
        lower: true,
        strict: true,
    });

    return getSlug(slugifiedNameBase);
}
