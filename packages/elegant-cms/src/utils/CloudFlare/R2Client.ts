import { S3Client } from '@aws-sdk/client-s3';

/**
 * The AWS S3 Client SDK Wrapper.
 * @returns Returns an S3 compliant client for accessing storage services such as S3 and CloudFlare R2.
 */
export default function R2Client(
    accountID: string,
    accessKeyId: string,
    secretAccessKey: string,

) {
    return new S3Client({
        region: 'auto',
        endpoint: `https://${accountID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
        },
    });
}