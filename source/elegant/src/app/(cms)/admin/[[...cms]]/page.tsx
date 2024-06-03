import CMS from '@/components/Admin/Cms';
import { Suspense } from 'react';

export default function Admin() {
    return(
        <Suspense>
            <CMS 
                postgresUrl={process.env.POSTGRES_PRISMA_URL}
                nonPoolingPUrl={process.env.POSTGRES_URL_NON_POOLING}
            />
        </Suspense>
    );
}