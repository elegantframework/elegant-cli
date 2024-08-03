import React, { Suspense } from 'react';
import CmsClient from './CmsClient';
import { getAdminCount } from '../../utils/Actions';
 
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
    params: {  cms: string[] };
};

export default async function CMS({ 
    postgresUrl,
    nonPoolingPUrl,
    params 
}: Props) {
    // const session = await auth();
    const adminCount = await getAdminCount();

    console.log(adminCount)
    
    return(
        <CmsClient 
            postgresUrl={postgresUrl}
            nonPoolingPUrl={nonPoolingPUrl}
            adminCount={adminCount}
            session={null}
            params={params}
        />
    );
}