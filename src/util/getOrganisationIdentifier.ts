import { Organisation } from '@prisma/client';
import { S3Config } from 'src/resolvers/types/generated';

export function getOrganisationIdentifier(
    auth: { organisation: Organisation } | null,
    s3Config: S3Config
): string {
    if (s3Config && s3Config.customerPath) {
        console.log('Using s3Config');
        return s3Config.customerPath;
    }

    if (!auth) {
        throw new Error('Authorization required');
    }

    return auth.organisation.id;
}
