'use client'
import NewsletterForm from "@/components/NewsletterForm";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { Newspaper } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShowNextButton } from '@brandonowens/elegant-ui';
import PageViews from "./../../page-views";
import { cn } from "@/utils/utils";

export interface TagsPageProps {
    posts: {
        title: string;
        slug: string;
        tags: string[],
        description: string;
        publishedAt: Date;
    }[];
    views: {
        slug: string;
        count: number;
    }[];
};

export default function TagsPage({
    posts,
    views
}: TagsPageProps) {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? 1;
    const perPage = 6;
  
    const start = ((Number(page) - 1) * perPage);
    const end = start + perPage;
  
    const entries = posts.slice(start, end);
    
    return(
        <main className="h-screen max-w-[52rem] mx-auto px-4 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl">
            <div className="py-16 sm:text-center">
                <h1 className="mb-4 text-3xl sm:text-4xl tracking-tight text-slate-900 font-extrabold dark:text-slate-200">
                    Latest Updates
                </h1>
                {process.env.NEXT_PUBLIC_CONVERTKIT_ACTION_URL && (
                    <>
                    <p className="text-lg text-slate-700 dark:text-slate-400">
                        All the latest {process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} news, straight from the team.
                    </p>
                    <section className="mt-3 max-w-sm sm:mx-auto sm:px-4">
                        <h2 className="sr-only">
                            Sign up for our newsletter
                        </h2>
                        <NewsletterForm action={
                            process.env.NEXT_PUBLIC_CONVERTKIT_ACTION_URL || ""
                        }/>
                    </section>
                    </>
                )}
            </div>
            {entries.length === 0 && (
                <div className="text-center">
                    <div>
                        <Newspaper width={40} className="inline"/>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No blog posts found</h3>
                    <p className="mt-1 text-sm text-gray-500">Please stay tuned and check back later.</p>
                </div>
            )}
            {entries.length > 0 && (
                <>
                     <div className="relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
                        <div className="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 dark:bg-slate-800 sm:block" />
                        <div className="space-y-16">
                            {entries.map((post: {
                                title: string;
                                slug: string;
                                description: string;
                                tags: string[];
                                publishedAt: Date;
                            }) => (
                                <article key={post.slug} className="relative group">
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
                                            {post.title}
                                        </h3>
                                        <div className="mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 dark:prose-dark line-clamp-2">
                                            {post.description}
                                        </div>
                                        <div className="mb-4 flex">
                                            {post.tags?.map((tag) => (
                                                <Link
                                                    href={`/blog/tags/${tag}`}
                                                    className="relative mr-4 z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-sm text-gray-600 hover:bg-gray-100"
                                                    key={tag}
                                                    >
                                                    {tag}
                                                </Link>
                                            ))}
                                            <PageViews slug={`blog/${post.slug}`} views={views}/>
                                        </div>
                                        <dl className="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
                                            <dt className="sr-only">Date</dt>
                                            <dd className={cn('whitespace-nowrap text-sm leading-6 dark:text-slate-400')}>
                                            <time dateTime={post.publishedAt.toString()}>
                                                {moment.utc(post.publishedAt).format('MMMM Do YYYY').toString()}
                                            </time>
                                            </dd>
                                        </dl>
                                    </div>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="flex items-center text-sm text-primary-500 font-medium"
                                    >
                                        <>
                                            <span className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl" />
                                            <span className="relative">
                                                Read more<span className="sr-only">, {post.title}</span>
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
                                        </>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                    <nav className="flex items-center justify-between mt-10 bg-white px-4 py-3 sm:px-6">
                        <div className="-mt-px flex w-0 flex-1">
                            {Number(page) > 1 && (
                                <Link
                                    href={`/blog/?page=${Number(page) - 1}`}
                                    className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-400"
                                >
                                    <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Previous
                                </Link>
                            )}
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center pt-4">
                            <div>
                                <p className="text-sm text-gray-700">
                                Showing
                                <span className="font-medium mx-1">
                                    {start + 1}
                                </span>
                                to
                                <span className="font-medium mx-1">
                                    {end < posts.length ? end : posts.length}
                                </span>
                                of
                                <span className="font-medium mx-1">{posts.length}</span>
                                results
                                </p>
                            </div>
                        </div>
                        <div className="-mt-px flex w-0 flex-1 justify-end">
                            {ShowNextButton(
                                Number(page),
                                posts.length,
                                perPage
                            ) && (
                                <Link
                                    href={`/blog/?page=${Number(page) + 1}`}
                                    className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-400"
                                >
                                    Next
                                    <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </Link>
                            )}
                        </div>
                    </nav>
                </>
            )}
        </main>
    );
}