import React from 'react';
import Image from 'next/image';
import UnifiedFramework from '@/components/home/UnifiedFramework';
import { Footer } from '@/components/home/Footer';
import NextLink from 'next/link';
import { NavItems, NavPopover } from '@/components/Header';
import styles from './index.module.css';
import clsx from 'clsx';
import { ThemeToggle } from '@/components/ThemeToggle';
import socialCardLarge from '@/img/social-card-large.jpg';
import Config from '@/utils/Config/Config';
import MetaTitle from '@/utils/Meta/MetaTitle';
import Logo from '@/components/Logos/Logo/Logo';
import Link from 'next/link';

Home.layoutProps = {
  meta: {
    ogImage: socialCardLarge.src,
    title: MetaTitle(Config('app.name'), Config('app.tagline'))
  },
  stickyHeader: false
};

export default function Home() {
  return (
    <>
      <div className="overflow-hidden">
        <Header />
      </div> 
    </>
  )
};

/**
 * Render a header component for the splash page
 * @returns A Header component
 */
const Header = () => {
  return (
    <React.Fragment>
      <header className="relative">
        <div className="px-4 sm:px-6 md:px-8">
          <div
            className={clsx(
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
            <Logo className="w-auto h-7" />
            <div className="flex items-center">
              <NavPopover className="-my-1 ml-2 -mr-1" display="md:hidden" />
              <div className="hidden md:flex items-center">
                <nav>
                  <ul className="flex items-center gap-x-8">
                    <NavItems />
                  </ul>
                </nav>
                <div className="flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800">
                  <ThemeToggle />
                  <a
                    href={Config('app.repository')}
                    className="ml-6 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
                    target="_blank"
                  >
                    <span className="sr-only">{Config('app.name')} on GitHub</span>
                    <svg
                      viewBox="0 0 16 16"
                      className="w-5 h-5"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <main className="flex min-h-[92vh] flex-col items-center justify-between p-0 pt-24 md:p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
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
                  Find in-depth information about Elegant's features, and take your website to the next level.
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
        </div>
      </header>
    </React.Fragment>
  );
};