import { SearchButton } from '@/components/Search';
import { Hero } from '@/components/home/Hero';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/home/Footer';
import NextLink from 'next/link';
import Head from 'next/head';
import { NavItems, NavPopover } from '@/components/Header';
import styles from './index.module.css';
import clsx from 'clsx';
import { ThemeToggle } from '@/components/ThemeToggle';
import socialCardLarge from '@/img/social-card-large.jpg';
import textToKebabCase from "./../utils/textToKebabCase";


Home.layoutProps = {
  meta: {
    ogImage: socialCardLarge.src,
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <meta
          key="twitter:title"
          name="twitter:title"
          content={process.env.NEXT_PUBLIC_APP_NAME + " - " + textToKebabCase(process.env.NEXT_PUBLIC_APP_TAGLINE)}
        />
        <meta
          key="og:title"
          property="og:title"
          content={process.env.NEXT_PUBLIC_APP_NAME + " - " + textToKebabCase(process.env.NEXT_PUBLIC_APP_TAGLINE)}
        />
        <title>{process.env.NEXT_PUBLIC_APP_NAME + " - " + textToKebabCase(process.env.NEXT_PUBLIC_APP_TAGLINE)}</title>
      </Head>
      <div className="mb-20 overflow-hidden sm:mb-32 md:mb-40">
        <Header />
      </div>
      <Footer />
    </>
  )
};

/**
 * Render a header component for the splash page
 * @returns A Header component
 */
const Header = () => {
  return (
    <header className="relative">
      <div className="px-4 sm:px-6 md:px-8">
        <div
          className={clsx(
            'absolute inset-0 bottom-10 bg-bottom bg-no-repeat bg-slate-50 dark:bg-[#0B1120]',
            styles.beams
          )}
        >
          <div
            className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent, black)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
            }}
          />
        </div>
        <div className="relative pt-6 lg:pt-8 flex items-center justify-between text-slate-700 font-semibold text-sm leading-6 dark:text-slate-200">
          <Logo className="w-auto h-7" />
          <div className="flex items-center">
            <SearchButton className="text-slate-500 hover:text-slate-600 w-8 h-8 -my-1 flex items-center justify-center md:hidden dark:hover:text-slate-300">
              <span className="sr-only">Search</span>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m19 19-3.5-3.5" />
                <circle cx="11" cy="11" r="6" />
              </svg>
            </SearchButton>
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
                  href={process.env.NEXT_PUBLIC_APP_REPOSITORY}
                  className="ml-6 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
                  target="_blank"
                >
                  <span className="sr-only">{process.env.NEXT_PUBLIC_APP_NAME} on GitHub</span>
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
        <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
          <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
            {process.env.NEXT_PUBLIC_APP_TAGLINE}
          </h1>
          <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
            A utility-first CMS framework for rapidly building{' '}
            <code className="font-mono font-medium text-sky-500 dark:text-sky-400">expressive</code>{' '}
            and{' '}
            <code className="font-mono font-medium text-sky-500 dark:text-sky-400">elegant</code>{' '}
            static web applications.
          </p>
          <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
            <NextLink href="/docs/installation">
              <a className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
                Get started
              </a>
            </NextLink>
            <SearchButton className="hidden sm:flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700">
              {( actionKey ) => (
                <>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-none text-slate-300 dark:text-slate-400"
                    aria-hidden="true"
                  >
                    <path d="m19 19-3.5-3.5" />
                    <circle cx="11" cy="11" r="6" />
                  </svg>
                  <span className="flex-auto">Quick search...</span>
                  {actionKey && (
                    <kbd className="font-sans font-semibold dark:text-slate-500">
                      <abbr
                        title={actionKey[1]}
                        className="no-underline text-slate-300 dark:text-slate-500"
                      >
                        {actionKey[0]}
                      </abbr>{' '}
                      K
                    </kbd>
                  )}
                </>
              )}
            </SearchButton>
          </div>
        </div>
      </div>
      <Hero />
    </header>
  )
};