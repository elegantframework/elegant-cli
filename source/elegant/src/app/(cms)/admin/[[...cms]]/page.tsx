import CMS from '@/components/Admin/Cms';
import { Suspense } from 'react';
import { getAdminCount } from "@/utils/Actions";
import { auth } from '@/utils/Auth';
import { Metadata, ResolvingMetadata } from 'next';

interface Props {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    
    // @todo: use the elegant-cms method generateMetadata() to create the metadata based on page route
    return {
      title: "Hello world",
      openGraph: {
        // images: ['/some-specific-page-image.jpg', ...previousImages],
      },
    }
}

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