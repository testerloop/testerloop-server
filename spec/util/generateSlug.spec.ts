import { Organisation } from '@prisma/client';
import { generateSlug } from 'src/util/generateSlug';
import { prismaMock } from 'spec/__mocks__/singleton';

describe('generateSlug util', () => {
    const mockOrganisation: Organisation = {
        id: 1,
        name: 'Test String',
        slug: 'test-string',
        s3CstomPath: 'test-path',
        s3BucketName: 'test-bucket',
        s3Region: 'test-region',
    };

    it('generates a slug from a string', async () => {
        const name = 'Test String';

        prismaMock.organisation.findUnique.mockResolvedValue(null);

        const slug = await generateSlug(name);

        expect(slug).toBe('test-string');
    });

    it('removes special characters from a string', async () => {
        const name = 'Test / String @ 123 !';

        prismaMock.organisation.findUnique.mockResolvedValue(null);

        const slug = await generateSlug(name);

        expect(slug).toBe('test-string-123');
    });

    it('generates a unique slug when duplicates exist', async () => {
        const name = 'Test String';

        prismaMock.organisation.findUnique
            .mockResolvedValueOnce(mockOrganisation)
            .mockResolvedValueOnce(null);

        const slug = await generateSlug(name);

        expect(slug).toBe('test-string-1');
    });

    it('generates incremented slugs when multiple duplicates exist', async () => {
        const name = 'Test String';

        prismaMock.organisation.findUnique
            .mockResolvedValueOnce(mockOrganisation)
            .mockResolvedValueOnce({
                ...mockOrganisation,
                slug: 'test-string-1',
            })
            .mockResolvedValueOnce(null);

        const slug = await generateSlug(name);

        expect(slug).toBe('test-string-2');
    });
});
