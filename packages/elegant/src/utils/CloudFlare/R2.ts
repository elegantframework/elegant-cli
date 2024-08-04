import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import S3Client from './R2Client';
import { NextResponse } from 'next/server';

/**
 * Save an item to CloudFlare R2.
 * @returns A url to access the stored item.
 */
export default async function Save(file: File) {
    const signedUrl = await getSignedUrl(
        S3Client(
            process.env.R2_ACCOUNT_ID || "",
            process.env.R2_ACCESS_KEY_ID || "",
            process.env.R2_SECRET_ACCESS_KEY || ""
        ),
        new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            ContentType: file.type,
            Key: file.name,
        }),
        { expiresIn: 60 }
    )

    return NextResponse.json({ url: signedUrl });
}