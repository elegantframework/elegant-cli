import React, { useEffect } from "react";
import { Card, MetaTitle } from '@brandonowens/elegant-ui';
import BackButton from "../BackButton";

export default function Error() {
    useEffect(() => {
        document.title = `Page not found - ${MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "", "Elegant CMS")}`;
    }, []);
    
    return(
        <main className="relative flex h-screen flex-col items-center justify-center z-10 p-4">
            <Card>
                <p className="text-base font-semibold text-indigo-600">
                    404
                </p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-200 sm:text-5xl">
                    Page not found
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600 dark:text-slate-200">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-10 flex \tems-center justify-center gap-x-6">
                    <BackButton />
                </div>
            </Card>
        </main>
    );
}