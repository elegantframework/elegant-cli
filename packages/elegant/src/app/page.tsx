"use client"
import Link from "next/link";
import Logo from "@/components/Logo";
import { Suspense } from "react";
import { GitHubIcon, VersionSelector } from "@brandonowens/elegant-ui";
import ThemeToggle from "@/components/ThemeToggle";
import { NavPopover, NavItems } from "@/components/Header";
import { cn } from "@/utils/utils";
import styles from './index.module.css';

export default function Home() {
  return (
    <>
      <header className="relative">
        <div className="px-4 sm:px-6 md:px-8">
          <div
            className={cn(
              'absolute inset-0 bottom-0 bg-bottom bg-no-repeat bg-slate-50 dark:bg-[#0B1120]',
              styles.beams
            )}
          >
            <div
              className="absolute inset-0 bg-[bottom_1px_center] dark:bg-bottom dark:border-b dark:border-slate-100/5"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent, black)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
              }}
            />
          </div>
          <div className="relative pt-6 lg:pt-8 flex items-center justify-between text-slate-700 font-semibold text-sm leading-6 dark:text-slate-200">
            <div className="flex">
              <Logo 
                className="w-auto h-7 mr-4" 
                title={process.env.NEXT_PUBLIC_APP_NAME || `Elegant` + ` logo`}
              />
              {/* <VersionSelector
                version='3.x'
                pastVersions={[
                    {label: "2.x", href: "https://www.v2.elegantframework.com/"},
                    {label: "1.x", href: "https://www.v1.elegantframework.com/"}
                ]}
              /> */}
            </div>
            <div className="flex items-center">
              <Suspense>
                <NavPopover className="-my-1 ml-2 -mr-1" display="md:hidden" />
              </Suspense>
              <div className="hidden md:flex items-center">
                <nav>
                  <ul className="flex items-center gap-x-8">
                    <Suspense>
                      <NavItems />
                    </Suspense>
                  </ul>
                </nav>
                <div className="flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800">
                  <Suspense>
                    <ThemeToggle />
                  </Suspense>
                  {process.env.NEXT_PUBLIC_APP_REPOSITORY && (
                    <a
                      href={process.env.NEXT_PUBLIC_APP_REPOSITORY || ""}
                      className="ml-6 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">{process.env.NEXT_PUBLIC_APP_NAME || "Elegant"} on GitHub</span>
                      <GitHubIcon className="w-5 h-5 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"/>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="flex h-screen flex-col items-center mt-20 px-4 sm:px-6 md:px-8">
          <div className="z-10 max-w-5xl w-full mb-0 md:mb-40 items-center justify-between text-sm lg:flex">
            <div className='rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 relative bg-gray-900 dark:bg-white shadow-2xl'>
              <h2 className='text-3xl font-bold tracking-tight text-gray-300 dark:text-gray-900 sm:text-4xl'>
                Welcome.
              </h2>
              <p className="mt-14 pl-2 pr-4 font-mono text-gray-400 dark:text-gray-600">
                Get started by editing&nbsp;
                <code className="font-mono font-bold">src/pages/index.tsx</code>
              </p>
            </div>
          </div>
          <div className="mb-32 grid text-center lg:max-w-6xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left z-10 mt-16 lg:mt-0">
            <a
              href="https://www.elegantframework.com/docs/rich-snippets?utm_source=elegant_cli"
              className="group text-gray-900 dark:text-gray-200 hover:dark:text-white px-5 py-4 h-auto transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Learn{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300`}>
                    {`Find in-depth information about Elegant's features, and take your website to the next level.`}
              </p>
            </a>
            <Link
              href="/admin"
              className="group text-gray-900 dark:text-gray-200 hover:dark:text-white px-5 py-4 h-auto transition-colors"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Create{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300`}>
                Get started creating amazing content with your new CMS editor.
              </p>
            </Link>
            <a
              href="https://www.elegantframework.com/docs/deployment?utm_source=elegant_cli"
              className="group text-gray-900 dark:text-gray-200 hover:dark:text-white px-5 py-4 h-auto transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Deploy{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300`}>
                Quickly deploy your Elegant web application to your own custom URL.
              </p>
            </a>
            <a
              href="https://www.elegantframework.com/docs/contribution-guide?utm_source=elegant_cli"
              className="group text-gray-900 dark:text-gray-200 hover:dark:text-white px-5 py-4 h-auto transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Contribute{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300`}>
                Suggest new ideas and features, report bugs and user friction, and get involved in the Elegant community.
              </p>
            </a>
          </div>
        </main>
      </header>
    </>
  );
}
