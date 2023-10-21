import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import ReactLogo from "../Logos/ReactLogo/ReactLogo";
import NextJsLogo from "../Logos/NextJsLogo/NextJsLogo";
import TailwindCSSLogo from "../Logos/TailwindCSSLogo/TailwindCSSLogo";
import MDXLogo from "../Logos/MDXLogo/MDXLogo";

const UnifiedFramework = () => {
  return (
    <section className="relative mt-20 mb-20 sm:mt-32 md:mt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-primary-500 dark:text-primary-400 text-xl tracking-tight font-bold sm:text-xl mb-10">
          Unified platform
        </h2>
        <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
          A fully integrated suite of frontend technologies.
        </p>
        <p className="mt-4 max-w-3xl space-y-6">
          Elegant brings everything — static content, Next.js, Tailwind CSS, and much more — together in one simple application.
        </p>
        <Link href="/docs/installation">
          <div className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap pl-4 pr-3 focus:outline-none focus:ring-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700 focus:ring-indigo-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-8 cursor-pointer">
            Get started <ChevronRightIcon className="h-5 w-5 ml-3 text-indigo-300 group-hover:text-indigo-400 dark:text-slate-500 dark:group-hover:text-slate-400" aria-hidden="true"/>
          </div>
        </Link>
        <ul role="list" className="mt-12 ml-6 flex items-center gap-x-8 justify-center md:justify-between sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0">
          <li>
            <ul role="list" className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0">
              <li className="flex mr-6">
                <ReactLogo />
                <span className="mt-1 ml-2 font-semibold">
                  React
                </span>
              </li>
              <li className="flex mr-6">
                <NextJsLogo />
                <span className="mt-1 ml-2 font-semibold">
                  Next.js
                </span>
              </li>
              <li className="flex mr-6">
                <TailwindCSSLogo className="h-7"/>
                <span className="mt-1 ml-2 font-semibold">
                 Tailwind CSS
                </span>
              </li>
              <li className="flex">
                <MDXLogo className="h-7"/>
                <span className="mt-1 ml-2 font-semibold min-w-[70px]">
                  MDX-JS
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default UnifiedFramework;