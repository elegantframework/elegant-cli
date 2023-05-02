import { NewsletterForm } from '@/components/core/NewsletterForm/NewsletterForm'
import { Widont } from '@/components/Widont'
import { getAllPostPreviews } from '@/utils/getAllPosts'
import Link from 'next/link'
import clsx from 'clsx'
import { formatDate } from '@/utils/formatDate'
import buildRss from '@/scripts/build-rss'

let posts = getAllPostPreviews()

export default function Blog() {
  return (
    <main className="max-w-[52rem] mx-auto px-4 pb-28 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl">
      <header className="py-16 sm:text-center">
        <h1 className="mb-4 text-3xl sm:text-4xl tracking-tight text-slate-900 font-extrabold dark:text-slate-200">
          Latest Updates
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-400">
          <Widont>All the latest Elegant news, straight from the team.</Widont>
        </p>
        <NewsletterSignupBlock action={process.env.NEXT_PUBLIC_CONVERTKIT_ACTION_URL}/>
      </header>
      <div className="relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
        <div className="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 dark:bg-slate-800 sm:block" />
        <div className="space-y-16">
          {posts.map(({ slug, module: { default: Component, meta } }) => (
            <article key={slug} className="relative group">
              <div className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl group-hover:bg-slate-50/70 dark:group-hover:bg-slate-800/50" />
              <svg
                viewBox="0 0 9 9"
                className="hidden absolute right-full mr-6 top-2 text-slate-200 dark:text-slate-600 md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block"
              >
                <circle
                  cx="4.5"
                  cy="4.5"
                  r="4.5"
                  stroke="currentColor"
                  className="fill-white dark:fill-slate-900"
                  strokeWidth={2}
                />
              </svg>
              <div className="relative">
                <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 pt-8 lg:pt-0">
                  {meta.title}
                </h3>
                <div className="mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 dark:prose-dark line-clamp-2">
                  <Component />
                </div>
                <dl className="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
                  <dt className="sr-only">Date</dt>
                  <dd className={clsx('whitespace-nowrap text-sm leading-6 dark:text-slate-400')}>
                    <time dateTime={meta.date}>{formatDate(meta.date, '{MMMM} {DD}, {YYYY}')}</time>
                  </dd>
                </dl>
              </div>
              <Link href={`/blog/${slug}`}>
                <a className="flex items-center text-sm text-primary-500 font-medium">
                  <span className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl" />
                  <span className="relative">
                    Read more<span className="sr-only">, {meta.title}</span>
                  </span>
                  <svg
                    className="relative mt-px overflow-visible ml-2.5 text-primary-300 dark:text-primary-700"
                    width="3"
                    height="6"
                    viewBox="0 0 3 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M0 0L3 3L0 6"></path>
                  </svg>
                </a>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

Blog.layoutProps = {
  meta: {
    title: 'Blog',
    description: 'All the latest Elegant news, straight from the team.',
  },
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    buildRss()
  }

  return { props: {} }
}

/**
 * A newsletter signup form.
 * @param {string} action an action url to handle the for submission.
 * @returns An html section containing a newsletter signup form.
 */
const NewsletterSignupBlock = ({action}) => {
  // if a url to handle the newsletter click has been provided
  // allow the newsletter sign up section to be displayed.
  if(action !== undefined && action.length > 0){
    return(
      <section className="mt-3 max-w-sm sm:mx-auto sm:px-4">
        <h2 className="sr-only">Sign up for our newsletter</h2>
        <NewsletterForm action={action}/>
      </section>
    );
  }
  return null;
};