import React from 'react';
import CmsClient from './CmsClient';
import { getAllCollections } from '@/utils/Db/Actions/Collection';
import { R2Config } from '../Types';
import { getAdminCount } from '@/utils/Db/Actions/User';
import { auth } from '@/utils/Auth/Auth';
 
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
     * Our Cloudflare R2 bucket storage configuration object.
     */
    r2Config: R2Config;
    /**
     * The url segments.
     */
    params: {  cms: string[] };
};

export default async function CMS({ 
    postgresUrl,
    nonPoolingPUrl,
    r2Config,
    params 
}: Props) {
    const session = await auth();

    const adminCount = (
        process.env.POSTGRES_PRISMA_URL && process.env.POSTGRES_PRISMA_URL.length > 0 ? 
        await getAdminCount() :
        0
    );
    const collections = (
        process.env.POSTGRES_PRISMA_URL && process.env.POSTGRES_PRISMA_URL.length > 0 ? 
        await getAllCollections() :
        []
    );
        
    return(
        <CmsClient 
            postgresUrl={postgresUrl}
            nonPoolingPUrl={nonPoolingPUrl}
            r2Config={r2Config}
            adminCount={adminCount}
            session={session}
            params={params}
            collections={collections || []}
        />
    );
}