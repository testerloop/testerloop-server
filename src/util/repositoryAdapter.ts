import { Organisation } from '@prisma/client';
import { S3Config } from 'src/resolvers/types/generated';


class RepositoryAdapter {
    async getBucketAndPath(
        auth: { organisation: Organisation } | null,
        s3Config: S3Config
    ) {
        let s3BucketName;
        let customerPath;
        if (!s3Config) {
            if (!auth) {
                throw new Error('Authorization required');
            }
            const organisation = auth.organisation;
            customerPath = organisation.s3CustomPath;
            s3BucketName = organisation.s3BucketName;
        } else {
            console.log('Using s3Config');
            ({ customerPath, bucket: s3BucketName } = s3Config);
        }

        if (!customerPath || !s3BucketName) {
            throw new Error(
                'Invalid configuration. Please provide s3BucketName and customerPath.'
            );
        }

        return { s3BucketName, customerPath };
    }
    getOrganisationIdentifier(
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
}

const repositoryAdapter = new RepositoryAdapter();

export default repositoryAdapter;
