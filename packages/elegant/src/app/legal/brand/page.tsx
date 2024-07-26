import Header from "@/components/Header";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: `Brand Copyright Policy - ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`}`,
    description: `See our brand copyright policy and how it relates to you.`,
};

/**
 * A standard boilerplate brand copyright policy page.
 * @returns A html page for displaying an applications copyright policies.
 */
export default function BrandPolicy() {
    return(
        <>
            <Suspense>
                <Header />
            </Suspense>
            <main className="max-w-3xl mx-auto relative z-20 pt-10 pb-20 sm:pb-10 px-6 sm:px-8 md:px-10">
                <div className="px-4 sm:px-6 md:px-8 relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32 pb-20 sm:pb-24 lg:pb-32">
                    <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
                        Brand Assets
                    </h1>
                </div>
                <p className="pb-10 text-lg text-slate-800 dark:text-slate-400">
                    <b>{`${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`}`}</b> brand assets and usage guidelines.
                </p>
                <hr />
                <h2 className="pt-12 pb-12 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl pt-5 pb-5">
                    Trademark Usage Agreement
                </h2>
                <p className="pb-5 text-lg text-slate-800 dark:text-slate-400">
                    The <b>{`${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`}`}</b> name and logos are trademarks of Elegant, Inc.
                </p>
                <p className="pb-5 text-lg text-slate-800 dark:text-slate-400">
                    You may not use the <b>{`${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`}`}</b> name or logos in any way that could mistakenly imply any official connection with or endorsement of {`${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`}`}. Any use of the <b>{`${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`}`}</b> name or logos in a manner that could cause customer confusion is not permitted.
                </p>
                <p className="pb-14 text-lg text-slate-800 dark:text-slate-400">
                    Additionally, you may not use our trademarks for t-shirts, stickers, or other merchandise without explicit written consent.
                </p>
                <hr />
                <h2 className="pt-12 pb-12 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl pt-5 pb-5">
                    Assets
                </h2>
                <p className="pb-5 text-lg text-slate-800 dark:text-slate-400">
                    These assets are provided for use in situations like articles and video tutorials. They should not be used in any way that could be confusing for customers or imply any affiliation with {`${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`}`}.
                </p>
                <h2 className="pt-16 pb-12 text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-1xl pt-5 pb-5">
                    Logo
                </h2>
                <a href="/logo.svg" download>
                    <img src="/logo.svg" alt="Download Logo"/>
                </a> 
            </main>
        </>
    );
}