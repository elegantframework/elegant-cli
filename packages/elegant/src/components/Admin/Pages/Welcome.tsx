'use client'
import React, { useEffect } from "react";
import { Card, ElegantLogo, MetaTitle } from '@brandonowens/elegant-ui';
import Link from "next/link";
import ArrowLongLeftIcon from '@heroicons/react/20/solid/ArrowLongLeftIcon';
import { R2Config } from "@/components/Types";
import { useRouter } from "next/navigation";

export interface WelcomeProps {
    postgresUrl: string | undefined,
    nonPoolingPUrl: string | undefined,
    r2Config: R2Config | undefined
};

export default function Welcome({
    postgresUrl,
    nonPoolingPUrl,
    r2Config
}: WelcomeProps) {
    const router = useRouter();

    useEffect(() => {
        document.title = `Welcome to Elegant CMS - ${MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "Welcome", "Elegant CMS")}`;
        router.replace('/admin');
    }, []);

    return(
        <main className="relative flex bg-gray-50 dark:bg-gray-900 flex-col items-center justify-center z-10 p-4 mb-20">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mt-20">
                <ElegantLogo className="w-auto h-8 mx-auto"/>
            </div>
            <Card className="mt-10 w-full max-w-xl shadow-md p-0">
                <div className="w-full border-b border-gray-200 dark:border-slate-200 pb-5 text-left -mt-[10px]">
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-slate-900 dark:text-slate-200">
                        Welcome to Elegant CMS
                    </h2>
                </div>
                <p className="mb-5 mt-10 text-left dark:text-slate-200">
                    Before you can access your admin area, please set the following environment variables in your `.env` file:
                </p>
                <ul className="mb-5">
                    {!postgresUrl && 
                        <li key={'db_url'} className="mb-1 text-left dark:text-slate-200">
                            {`❌`}{' '}
                            <span className="font-semibold">{'POSTGRES_PRISMA_URL'}</span>{' '}
                            {`is not set!`}
                        </li>
                    }
                    {!nonPoolingPUrl && 
                        <li key={'db_url_non_pooling'} className="mb-1 text-left dark:text-slate-200">
                            {`❌`}{' '}
                            <span className="font-semibold">{'POSTGRES_URL_NON_POOLING'}</span>{' '}
                            {`is not set!`}
                        </li>
                    }
                    {!r2Config?.accountId && 
                        <li key={'r2_config_accountId'} className="mb-1 text-left dark:text-slate-200">
                            {`❌`}{' '}
                            <span className="font-semibold">{'R2_ACCOUNT_ID'}</span>{' '}
                            {`is not set!`}
                        </li>
                    }
                    {!r2Config?.accessKeyId && 
                        <li key={'r2_config_accessKeyId'} className="mb-1 text-left dark:text-slate-200">
                            {`❌`}{' '}
                            <span className="font-semibold">{'R2_ACCESS_KEY_ID'}</span>{' '}
                            {`is not set!`}
                        </li>
                    }
                    {!r2Config?.secretAccessKey && 
                        <li key={'r2_config_secretAccessKey'} className="mb-1 text-left dark:text-slate-200">
                            {`❌`}{' '}
                            <span className="font-semibold">{'R2_SECRET_ACCESS_KEY'}</span>{' '}
                            {`is not set!`}
                        </li>
                    }
                    {!r2Config?.bucketName && 
                        <li key={'r2_config_bucketName'} className="mb-1 text-left dark:text-slate-200">
                            {`❌`}{' '}
                            <span className="font-semibold">{'R2_BUCKET_NAME'}</span>{' '}
                            {`is not set!`}
                        </li>
                    }
                    {!r2Config?.publicBucketUrl && 
                        <li key={'r2_config_publicBucketUrl'} className="mb-1 text-left dark:text-slate-200">
                            {`❌`}{' '}
                            <span className="font-semibold">{'R2_PUBLIC_BUCKET_URL'}</span>{' '}
                            {`is not set!`}
                        </li>
                    }
                </ul>
                <p className='w-full mb-5 mt-10 text-left dark:text-slate-200'>
                    You will need to restart Next.js to apply the changes.
                </p>
                <p className='w-full text-left dark:text-slate-200'>
                    See the <a href="https://www.elegantframework.com/docs/getting-started-with-elegant-cms#configuring-authentication" className="hover:underline font-mono font-medium text-indigo-500 dark:text-indigo-400" target={"_blank"} rel="noreferrer">documentation</a> for further help.
                </p>
            </Card>
            <div className="sm:mx-auto sm:w-full max-w-2xl xs:pl-0 sm:pl-4 text-left mt-10 mb-20 text-neutral-950 dark:text-white">
                <Link href="/" className="hover:underline">
                    <ArrowLongLeftIcon className="h-6 w-6 inline mr-2"/>Go to {process.env.NEXT_PUBLIC_APP_NAME || "Elegant"}
                </Link>
            </div>
        </main>
    );
}