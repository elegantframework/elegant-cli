import Seo from '@/components/Seo/Seo';
import Config from 'Config';
import MetaTitle from '@/utils/Meta/MetaTitle';
import { Card } from '@brandonowens/elegant-ui';
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';

/**
 * The 404 Error page for the admin area.
 * @returns An html page to be displayed when a user navigates to a page not found within the admin area.
 */
export default function Error() {
  const router = useRouter();

  return (
    <>
      <Seo 
        title={`Page not found - ${MetaTitle(Config('app.name'), "Elegant CMS")}`}
      /> 
      <main className="relative flex h-screen flex-col items-center justify-center z-10 p-4">
        <Card>
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-200 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-slate-200">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => router.back()}
            >
              <ArrowLongLeftIcon className='h-6 w-6 inline'/> Go back
            </a>
          </div>
        </Card>
      </main>
    </>
  )
}
