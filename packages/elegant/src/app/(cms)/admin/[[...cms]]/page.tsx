import { CMS } from '@eleganthq/elegant-cms';

interface Props {
    params: {  cms: string[] };
};

export default function Admin({ params }: Props) {
    // const adminCount = await getAdminCount();
    // const session = await auth();

    return(
      <CMS 
        postgresUrl={process.env.POSTGRES_PRISMA_URL || ""}
        nonPoolingPUrl={process.env.POSTGRES_URL_NON_POOLING || ""}      
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