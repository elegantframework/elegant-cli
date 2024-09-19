import NotFound from "@/app/not-found";
import Header from "@/components/Header";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllPublishedPostsForCollection, getPageViews, getPublishedPostBySlug, incrementPageViews } from "@/utils/Db/Actions/Post";
import MetaTitle from "@/utils/Meta/MetaTitle";
import moment from "moment";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import "@/components/Editor/css/editor.css";
import MarkdownToHtml from "@/utils/Rehype/MarkdownToHtml";
import Image from "next/image";
import { UserRound } from "lucide-react";

async function getPost(slug: string) {
    return await getPublishedPostBySlug(slug, 'posts');
}

async function getViews(slug: string) {
    const pageViews = await incrementPageViews(slug);

    return pageViews?.count || 0;
}

export async function generateMetadata(
    { params }: { params: { slug: string } },
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const post: {
        title: string;
        slug: string;
        description: string;
        content: string | null;
        publishedAt: Date;
        coverImage: string | null;
    } | null = await getPost(params.slug);

    if(!post){
        return {
            title: `Page not found - ${
                MetaTitle(
                    process.env.NEXT_PUBLIC_APP_NAME || "Elegant", 
                    process.env.NEXT_PUBLIC_APP_TAGLINE || ""
                )
            }`
        };
    }

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
   
    return {
      title: `${post?.title} - ${
        MetaTitle(
            process.env.NEXT_PUBLIC_APP_NAME || "Elegant", 
            process.env.NEXT_PUBLIC_APP_TAGLINE || ""
        )
      }`,
      description: `${post?.description || process.env.NEXT_PUBLIC_APP_DESCRIPTION || ""}`,
      openGraph: {
        images: [post?.coverImage || "", ...previousImages],
      },
    }
}

export default async function Blog({ params }: { params: { slug: string } }) {   
    const post: {
        title: string;
        slug: string;
        description: string;
        content: string | null;
        publishedAt: Date;
        coverImage: string | null;
        authors: {
            id: string,
            name: string | null,
            image: string | null,
            twitterHandle: string | null
        }[];
    } | null = await getPost(params.slug);

    if(!post){
        return(
            <NotFound />
        );
    }  
    
    const views = await getViews(`blog/${params.slug}`);

    let authors: { "@type": string; name: string | null; }[] = [];

    post.authors.forEach(author => {
        authors.push(
            {
                "@type": "Person",
                "name": author.name
            }
        );
    });

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        title: post?.title,
        images: [post?.coverImage],
        description: post?.description,
        datePublished: post?.publishedAt,
        authors: authors,
        isAccessibleForFree: true
    }

    return(
       <>
            <section>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </section>
            <Suspense>
                <Header />
            </Suspense>
            <div className="overflow-hidden">
                <div className="max-w-8xl mx-auto">
                    <div className="flex px-4 pt-8 pb-10 lg:px-8">
                        <Link
                            href="/blog"
                            className="group flex font-semibold text-sm leading-6 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
                        >
                            <svg
                                viewBox="0 -9 3 24"
                                className="overflow-visible mr-3 text-slate-400 w-auto h-6 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                            >
                                <path
                                    d="M3 0L0 3L3 6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>Go back
                        </Link>
                    </div>
                </div>
                <div className="px-4 sm:px-6 md:px-8">
                    <div className="max-w-3xl mx-auto pb-28">
                        <main>
                            <article className="relative pt-10">
                                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl">
                                    {post?.title}
                                </h1>
                                <div className="text-sm leading-6">
                                    <dl>
                                        <dt className="sr-only">Date</dt>
                                        <dd className="absolute top-0 inset-x-0 text-slate-700 dark:text-slate-400">
                                            <time dateTime={moment.utc(post?.publishedAt).format('dddd, MMMM Do YYYY').toString()}>
                                                {moment.utc(post?.publishedAt).format('dddd, MMMM Do YYYY').toString()}
                                            </time>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="mt-6">
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                        {`${views.toLocaleString()} views`}
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <ul className="flex flex-wrap text-sm leading-6 -mt-6 -mx-5">
                                        {post.authors.map((author: {
                                            id: string,
                                            name: string | null,
                                            image: string | null,
                                            twitterHandle: string | null
                                        }) => (
                                            <li
                                             key={author.id}
                                             className="flex items-center font-medium whitespace-nowrap px-5 mt-6"
                                            >
                                                {author.image && author.image.length > 0 &&(
                                                    <Image
                                                        src={author.image || ""}
                                                        width={100}
                                                        height={100}
                                                        alt={`${author.name} profile picture.`}
                                                        className="mr-3 w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800"
                                                        decoding="async"
                                                    />
                                                )}
                                                {!author.image &&(
                                                    <div className="h-9 w-9 mr-3 rounded-full bg-neutral-200">
                                                        <UserRound className="text-neutral-500 relative top-1 left-1.5"/>
                                                    </div>
                                                )}
                                                <div className="text-sm leading-4">
                                                    <div className="text-slate-900 dark:text-slate-200">
                                                        {author?.name}
                                                    </div>
                                                    <div className="mt-1">
                                                        {author?.twitterHandle && author.twitterHandle.length > 0 && (
                                                        <a
                                                            href={author.twitterHandle}
                                                            className="text-primary-500 hover:text-primary-600 dark:text-primary-400"
                                                            rel="noopener noreferrer"
                                                            target="_blank"
                                                        >
                                                            @{author.twitterHandle.replace('https://x.com/', '').replace('https://twitter.com/', '')}
                                                        </a> 
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div 
                                    id="content-wrapper"
                                    className="mt-12 prose prose-slate dark:prose-dark tiptap ProseMirror"
                                >
                                    <div dangerouslySetInnerHTML={{ __html: await MarkdownToHtml(post.content || "") }} />
                                </div>
                            </article>
                        </main>
                        <footer className="mt-16">
                            {process.env.NEXT_PUBLIC_CONVERTKIT_ACTION_URL && (
                                <div className="relative">
                                    <section className="relative py-16 border-t border-slate-200 dark:border-slate-200/5">
                                        <h2 className="text-xl font-semibold text-slate-900 tracking-tight dark:text-white">
                                            Get all of our updates directly to your inbox.
                                            <br />
                                            Sign up for our newsletter.
                                        </h2>
                                        <div className="mt-5 max-w-md">
                                            <NewsletterForm 
                                                action={process.env.NEXT_PUBLIC_CONVERTKIT_ACTION_URL || ""} 
                                            />
                                        </div>
                                    </section>
                                </div>
                            )}
                            <div className="relative">
                                <section className="relative py-16 border-t border-slate-200 dark:border-slate-200/5">
                                <div className='pt-8 pb-10 text-center text-slate-500 dark:border-slate-200/5'>
                                    Built with <a href='https://elegantframework.com/' 
                                        aria-label='Built with the Elegant framework'
                                        className='font-semibold hover:text-primary-500 dark:hover:text-primary-400'
                                    >
                                        Elegant
                                    </a>.
                                </div>
                                </section>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
       </>
    );
}