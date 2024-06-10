import CMS from '@/components/Admin/Cms';
import { Suspense } from 'react';
import { getAdminCount } from "@/utils/Actions";
import { auth } from '@/utils/Auth';

export default async function Admin({ params }: { params: { cms: string[] } }) {
    const adminCount = await getAdminCount();
    const session = await auth();

    return(
        <Suspense>
            <CMS 
                postgresUrl={process.env.POSTGRES_PRISMA_URL}
                nonPoolingPUrl={process.env.POSTGRES_URL_NON_POOLING}
                adminCount={adminCount}
                session={session}
                params={params}
            />
        </Suspense>
    );
}