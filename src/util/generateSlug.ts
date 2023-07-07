import slugify from 'slugify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function incrementSlug(slug: string) {
    const parts = slug.split('-');
    let num;

    if (parts.length > 1 && !isNaN(Number(parts[parts.length - 1]))) {
        num = Number(parts.pop());
    } else {
        num = 0;
    }

    return `${parts.join('-')}-${num + 1}`;
}

export async function getSlug(slug: string): Promise<string> {
    const existingOrganization = await prisma.organisation.findUnique({
        where: { slug },
    });

    if (existingOrganization) {
        const newSlug = await incrementSlug(slug);
        return getSlug(newSlug);
    }

    return slug;
}

export async function generateSlug(name: string) {
    const slugifiedNameBase = slugify(name, {
        lower: true,
        strict: true,
    });

    return getSlug(slugifiedNameBase);
}
