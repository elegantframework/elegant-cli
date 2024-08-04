'use client'
import React, { useEffect } from "react";
import { Card, ElegantLogo, MetaTitle } from '@brandonowens/elegant-ui';
import Link from "next/link";
import ArrowLongLeftIcon from '@heroicons/react/20/solid/ArrowLongLeftIcon';

export interface WelcomeProps {
    postgresUrl: string | undefined,
    nonPoolingPUrl: string | undefined
};

export default function Welcome({
    postgresUrl,
    nonPoolingPUrl
}: WelcomeProps) {

    useEffect(() => {
        document.title = `Welcome to Elegant CMS - ${MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "", "Elegant CMS")}`;
    }, []);

    return(
        <main className="relative flex h-screen flex-col items-center justify-center z-10 p-4">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <ElegantLogo className="w-auto h-8 mx-auto"/>
            </div>
            <Card className="mt-10 shadow-md">
                <div className="w-full border-b border-gray-200 dark:border-slate-200 pb-5 text-left -mt-[10px]">
                    <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-slate-200">Welcome to Elegant CMS</h3>
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
                </ul>
                <p className='w-full mb-5 mt-10 text-left dark:text-slate-200'>
                    You will need to restart Next.js to apply the changes.
                </p>
                <p className='w-full text-left dark:text-slate-200'>
                    See the <a href="https://www.elegantframework.com/docs/getting-started-with-elegant-cms#configuring-authentication" className="hover:underline font-mono font-medium text-indigo-500 dark:text-indigo-400" target={"_blank"}>documentation</a> for further help.
                </p>
            </Card>
            <div className="sm:mx-auto sm:w-full max-w-2xl xs:pl-0 sm:pl-4 text-left mt-10 dark:text-white">
                <Link href="/" className="hover:underline">
                    <ArrowLongLeftIcon className="h-6 w-6 inline mr-2"/>Go to {process.env.NEXT_PUBLIC_APP_NAME || ""}
                </Link>
            </div>
        </main>
    );
}