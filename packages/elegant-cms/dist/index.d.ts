import React from 'react';
import { NextResponse } from 'next/server';
import { S3Client } from '@aws-sdk/client-s3';
import { ResolvingMetadata, Metadata } from 'next';

interface Props$1 {
    /**
     * The url segments.
     */
    params: {
        cms: string[];
    };
}
declare function CMS({ params }: Props$1): React.JSX.Element;

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

interface Props {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}
declare function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata>;

export { CMS, Save as R2, R2Client as S3Client, generateMetadata };
