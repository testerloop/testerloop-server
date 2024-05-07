

import config from '../config.js';
import S3Service from '../S3Service.js';

const bucketName = config.AWS_BUCKET_NAME;

export const getAllStatuses = async () => {
    const results = await S3Service.listObjects(
        bucketName,
        'job_status/'
    );
    
    const jobData = await Promise.all(
        results.map(async (key) => {
            return { __typename: 'JobStatus', fileName: key.split('/')[1].split('.')[0], status: key.split('/')[1].split('.')[1] };
        })
    );

    return JSON.stringify(jobData);
}
