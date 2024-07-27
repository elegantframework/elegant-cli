import { Suspense } from 'react';
import { getAdminCount } from "@/utils/Actions";
import { auth } from '@/utils/Auth';
import { Metadata, ResolvingMetadata } from 'next';
import { CMS } from '@eleganthq/elegant-cms';

interface Props {
    params: {  cms: string[] };
};

export default function Admin({ params }: Props) {
    // const adminCount = await getAdminCount();
    // const session = await auth();

    return(
      <CMS 
        params={params}
      />
    );

    // return(
    //     <Suspense>
    //         <CMS 
    //             postgresUrl={process.env.POSTGRES_PRISMA_URL}
    //             nonPoolingPUrl={process.env.POSTGRES_URL_NON_POOLING}
    //             adminCount={adminCount}
    //             session={session}
    //             params={params}
    //         />
    //     </Suspense>
    // );
}