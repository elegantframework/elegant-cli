import MetaTitle from '@/utils/Meta/MetaTitle';
import Link from 'next/link';

const css = `
  body {
    display: flex;
  }
  #__next {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`
Error.layoutProps = {
  meta: {
    title: "Page not found - " + MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "", process.env.NEXT_PUBLIC_APP_TAGLINE || "")
  },
};


/**
 * Thee 404 error page
 * @returns An html 404 page telling the user that the page they requested was not found.
 */
export default function Error() {
  return (
    <>
      <div className="grid min-h-full place-items-center px-6 pb-24 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-primary-500 dark:text-primary-400">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-200 sm:text-5xl">
            This page could not be found
          </h1>
          <p className="mt-6 text-base leading-7 text-slate-700 dark:text-slate-400">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <Link
              href="/"
              className="text-sm font-semibold leading-6 text-primary-500 hover:text-primary-600 dark:text-primary-400 hover:dark:text-primary-500"
            >
              <span 
                className='mr-1'
                aria-hidden="true"
              >
                &larr;
              </span>
              Back to home
            </Link>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </div>
    </>
  )
};