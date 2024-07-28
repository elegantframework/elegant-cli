import React from 'react';
import { NextResponse } from 'next/server';
import { S3Client } from '@aws-sdk/client-s3';

interface Props {
    /**
     * Our database url connection string.
     */
    postgresUrl: string;
    /**
     * Our non-pooling database url connection string.
     */
    nonPoolingPUrl: string;
    /**
     * The url segments.
     */
    params: {
        cms: string[];
    };
}
declare function CMS({ postgresUrl, nonPoolingPUrl, params }: Props): Promise<React.JSX.Element>;

/**
 * Save an item to CloudFlare R2.
 * @returns A url to access the stored item.
 */
declare function Save(file: File): Promise<NextResponse<{
    url: string;
}>>;

/**
 * The AWS S3 Client SDK Wrapper.
 * @returns Returns an S3 compliant client for accessing storage services such as S3 and CloudFlare R2.
 */
declare function R2Client(accountID: string, accessKeyId: string, secretAccessKey: string): S3Client;

export { CMS, Save as R2, R2Client as S3Client };
