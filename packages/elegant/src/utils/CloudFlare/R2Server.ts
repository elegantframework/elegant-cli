'use server'

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import S3Client from './R2Client';

/**
 * Save an item to CloudFlare R2.
 * @returns A url to access the stored item.
 */
export async function Save(
    filename: string, 
    fileType: string,
    fileSize: number
) {
    const signedUrl = await getSignedUrl(
        S3Client(
            process.env.R2_ACCOUNT_ID || "",
            process.env.R2_ACCESS_KEY_ID || "",
            process.env.R2_SECRET_ACCESS_KEY || ""
        ),
        new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME || "",
            Key: filename,
            ContentType: fileType,
            ContentLength: fileSize
        }),
        { expiresIn: 3600 }
    );

    const publicURL = process.env.R2_PUBLIC_BUCKET_URL || "";

    return [ signedUrl, publicURL ];
}