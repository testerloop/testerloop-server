import config from '../config.js';
import S3Service from '../S3Service.js';

const bucketName = config.AWS_BUCKET_NAME;

export const getAllStatuses = async () => {
    const results = await S3Service.listObjectsWithDate(
        bucketName,
        'job_status/',
    );

    const jobData = await Promise.all(
        results
            .filter(
                (object) => object.fileName.split('/')[1].split('.')[0] !== '',
            )
            .map(async (elem) => {
                return {
                    __typename: 'JobStatus',
                    fileName: elem.fileName.split('/')[1].split('.')[0],
                    status: elem.fileName.split('/')[1].split('.')[1],
                    lastRun: elem.lastRun,
                };
            }),
    );

    return JSON.stringify(jobData);
};
