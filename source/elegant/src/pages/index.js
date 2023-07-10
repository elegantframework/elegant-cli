import React from 'react';
import Image from 'next/image';
import UnifiedFramework from '@/components/home/UnifiedFramework';
import Logo from '@/components/core/Logos/Logo/Logo';
import { Footer } from '@/components/home/Footer';
import NextLink from 'next/link';
import { NavItems, NavPopover } from '@/components/Header';
import styles from './index.module.css';
import clsx from 'clsx';
import { ThemeToggle } from '@/components/ThemeToggle';
import socialCardLarge from '@/img/social-card-large.jpg';
import MetaTitle from '@/utils/core/Meta/MetaTitle';
import Config from "Config";

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
    <React.Fragment>
      <header className="relative mb-20 pb-40">
        <div className="px-4 sm:px-6 md:px-8">
          <div
            className={clsx(
              'absolute inset-0 bottom-10 bg-bottom bg-no-repeat bg-slate-50 dark:bg-[#0B1120]',
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
              {/* <SearchButton className="text-slate-500 hover:text-slate-600 w-8 h-8 -my-1 flex items-center justify-center md:hidden dark:hover:text-slate-300">
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
              </SearchButton> */}
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
          <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
            <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
              {Config('app.tagline')}
            </h1>
            <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
              Elegant is the easiest way to create a new static{' '}
              <code className="font-mono font-medium text-primary-500 dark:text-primary-400">website</code>{' '} 
              or{' '}
              <code className="font-mono font-medium text-primary-500 dark:text-primary-400">blog</code>,{' '}
              and publish it online. No need for databases, external services, or complicated server setups.
            </p>
            <div className="mt-6 sm:mt-10 md:flex justify-center md:space-x-6 text-sm max-w-3xl mx-auto">
              <form 
                action={"https://app.convertkit.com/forms/5032790/subscriptions"} 
                method="post"
                target="_blank"
                className="md:flex flex-wrap md:-mx-2 w-full md:max-w-xl"
              >
                <div className="md:px-2 grow-[9999] basis-64">
                  <div className="group relative">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="w-6 h-full absolute inset-y-0 left-3 text-slate-400 pointer-events-none group-focus-within:text-primary-500 dark:group-focus-within:text-slate-400"
                      >
                        <path d="M5 7.92C5 6.86 5.865 6 6.931 6h10.138C18.135 6 19 6.86 19 7.92v8.16c0 1.06-.865 1.92-1.931 1.92H6.931A1.926 1.926 0 0 1 5 16.08V7.92Z" />
                        <path d="m6 7 6 5 6-5" />
                      </svg>
                      <input
                        name="email_address"
                        type="email"
                        required
                        autoComplete="email"
                        aria-label="Email address"
                        className="appearance-none shadow rounded-md mb-5 md:mb-0 ring-1 ring-slate-900/5 leading-5 sm:text-sm border border-transparent py-2 h-12 w-full placeholder:text-slate-400 pl-12 pr-3 block w-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-primary-700/20 dark:ring-primary-200/20 dark:focus:ring-primary-500 dark:text-white"
                        placeholder="Email address"
                      />
                  </div>
                </div>
                <div className="md:px-2 grow flex">
                  <button
                    type="submit"
                    className="bg-primary-500 flex-auto shadow text-white rounded-md mb-5 md:mb-0 text-sm border-y border-transparent py-2 font-semibold px-12 h-12 hover:bg-primary-600 dark:hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-primary-300 dark:focus:ring-offset-primary-900 dark:focus:ring-primary-700"
                  >
                      Sign Up
                  </button>
                </div>
              </form>
              <div className='border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-600 md:mx-3 mb-5 md:mb-0'></div>
              <NextLink href="/docs/installation">
                <a className="bg-secondary-500 hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto min-w-[128px] dark:bg-secondary-500 dark:highlight-white/20 dark:hover:bg-secondary-400">
                  Get Started
                </a>
              </NextLink>
            </div>
          </div>
        </div>
      </header>
      <UnifiedFramework />
      <section className="bg-slate-900 dark:bg-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl sm:text-4xl text-white dark:text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
              Frequently asked questions
            </h2>
          </div>
          <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            <li>
              <ul className="flex flex-col gap-y-8">
                <li>
                  <h3 className="font-semibold text-lg leading-7 text-white dark:text-slate-900 dark:text-slate-900">
                    What is Elegant and how does it work?
                  </h3>
                  <p className="mt-4 text-sm text-slate-300 dark:text-slate-700">
                    Elegant is a modern content creation framework that is the perfect starting point for your next project or idea. 
                    <br />
                    <br />
                    Elegant comes complete with everything you need to launch and grow a beautiful and amazing web application.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-lg leading-7 text-white dark:text-slate-900">
                    How much does Elegant cost?
                  </h3>
                  <p className="mt-4 text-sm text-slate-300 dark:text-slate-700">
                    Elegant is completely free, and super affordable to host.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-lg leading-7 text-white dark:text-slate-900">
                    What kind of web applications can I build with Elegant?
                  </h3>
                  <p className="mt-4 text-sm text-slate-300 dark:text-slate-700">
                    Elegant is perfect for building rich landing pages, detailed user guides, and amazing blog posts. 100% of this website has been built using the Elegant framework.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <ul className="flex flex-col gap-y-8">
                <li>
                  <h3 className="font-semibold text-lg leading-7 text-white dark:text-slate-900">
                    Do I have to write any setup code?
                  </h3>
                  <p className="mt-4 text-sm text-slate-300 dark:text-slate-700">
                    Nope! We have taken care of all the boilerplate code for you. Simply insert your custom idea and spin up a beautiful looking server side rendered web application.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-lg leading-7 text-white dark:text-slate-900">
                    Can I customize and extend the Elegant framework?
                  </h3>
                  <p className="mt-4 text-sm text-slate-300 dark:text-slate-700">
                    Yes! Elegant is 100% open source and extendable. We actively encourage code <NextLink href="/docs/contribution-guide"><a className="text-primary-500 font-semibold dark:text-primary-400 hover:underline">contributions</a></NextLink> from the development community.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-lg leading-7 text-white dark:text-slate-900">
                    Does Elegant offer simple Cloud based hosting for my web application?
                  </h3>
                  <p className="mt-4 text-sm text-slate-300 dark:text-slate-700">
                    Not currently. We are actively developing Elegant and hope to debut seamless hosting in a future release. Please subscribe to our newsletter to be the first to know when we launch native hosting.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <ul className="flex flex-col gap-y-8">
                <li>
                  <h3 className="font-semibold text-lg leading-7 text-white dark:text-slate-900">
                    Can I host my Elegant web application myself?
                  </h3>
                  <p className="mt-4 text-sm text-slate-300 dark:text-slate-700">
                    Of course, you can host your application on any cloud provider. Elegant has been built for optimal performance on the Vercel hosting platform.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-lg leading-7 text-white dark:text-slate-900">
                    What tools and features are included?
                  </h3>
                  <p className="mt-4 text-sm text-slate-300 dark:text-slate-700">
                    Elegant comes completely integrated with <NextLink href="/docs/google-analytics"><a className="text-primary-500 font-semibold dark:text-primary-400 hover:underline">Google Analytics</a></NextLink>, <NextLink href="/docs/google-analytics"><a className="text-primary-500 font-semibold dark:text-primary-400 hover:underline">ConvertKit</a></NextLink>, and more. 
                    <br />
                    <br />
                    We have included an SEO perfect theme that looks great on any device, and is perfect for blogging or writing user docs.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-lg leading-7 text-white dark:text-slate-900">
                    But why another framework?
                  </h3>
                  <p className="mt-4 text-sm text-slate-300 dark:text-slate-700">
                    Elegant is a simple <NextLink href="/blog/2023-04-24-but-why-another-framework"><a className="text-primary-500 font-semibold dark:text-primary-400 hover:underline">framework</a></NextLink> made up of the latest cutting edge frontend technologies. Elegant is meant to help you rapidly build your next idea, and not get in your way. 
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </React.Fragment>
  )
};