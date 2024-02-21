import { NewsletterForm } from "@/components/NewsletterForm/NewsletterForm";
import Seo from "@/components/Seo/Seo";
import Error from "@/pages/404";
import { Post } from "@/types/Post";
import { getDocumentBySlug, getDocuments } from "@/utils/Collections/collection";
import Config from 'Config';
import MarkdownToHtml from "@/utils/Rehype/MarkdownToHtml";
import moment from "moment";
import { GetServerSidePropsContext } from "next";
import { ArticleJsonLd } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import socialCardLarge from '@/img/social-card-large.jpg';

type Props = {
    /**
     * A blog post to be displayed.
     */
    post: Post;
    /**
     * HTML string content.
     */
    content: string;
};

export default function Index({
    post,
    content
}: Props) {
    const router = useRouter();

    if (!router.isFallback && !post?.slug) {
        return(
            <Error />
        );
    }

    // set our url
    let url = Config('app.url');

    if(
        process.env.NEXT_PUBLIC_VERCEL_URL !== undefined &&
        process.env.NEXT_PUBLIC_VERCEL_ENV !== undefined &&
        process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
    ){
        url = "https://" + process.env.NEXT_PUBLIC_VERCEL_URL;
    }

    // Set the social share image
    let image = socialCardLarge.src;

    if(post.coverImage){
        image = post.coverImage;
    }

    return(
        <>
            <Seo 
                title={`${post.title} - ${Config('app.description')}`}
                description={post.description || Config('app.description')}
                themeColor={"#f8fafc"}
                url={`${url}${router.asPath}`}
                image={`${url}${image}`}
            />
            <ArticleJsonLd 
                useAppDir={false}
                url={Config('app.url') + router.asPath}
                title={post.title}
                images={[
                    `${Config('app.url')}/images/${post.coverImage}`
                ]}
                datePublished={post.publishedAt || ""}
                authorName={[{
                    name: post.author?.name,
                    url: Config('app.twitter_handle').replace('@', '')
                }]}
                description={post.description}
                isAccessibleForFree={true}
            />
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
                                    {post.title}
                                </h1>
                                <div className="text-sm leading-6">
                                    <dl>
                                        <dt className="sr-only">Date</dt>
                                        <dd className="absolute top-0 inset-x-0 text-slate-700 dark:text-slate-400">
                                            <time dateTime={post.publishedAt}>
                                                {moment.utc(post.publishedAt).format('dddd, MMMM Do YYYY').toString()}
                                            </time>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="mt-6">
                                    <ul className="flex flex-wrap text-sm leading-6 -mt-6 -mx-5">
                                        <li
                                            key={Config('app.twitter_handle')}
                                            className="flex items-center font-medium whitespace-nowrap px-5 mt-6"
                                        >
                                            <img
                                                src={post.author?.picture}
                                                alt=""
                                                className="mr-3 w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800"
                                                decoding="async"
                                            />
                                            <div className="text-sm leading-4">
                                                <div className="text-slate-900 dark:text-slate-200">
                                                    {post.author?.name}
                                                </div>
                                                <div className="mt-1">
                                                    {Config('app.twitter_handle') && (
                                                        <a
                                                            href={`https://twitter.com/${Config('app.twitter_handle').replace('@', '')}`}
                                                            className="text-primary-500 hover:text-primary-600 dark:text-primary-400"
                                                        >
                                                            {Config('app.twitter_handle')}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-12 prose prose-slate dark:prose-dark">
                                    <div dangerouslySetInnerHTML={{ __html: content }} />
                                </div>
                            </article>
                        </main>
                        <footer className="mt-16">
                            {Config('app.convert_action_url') && (
                                <div className="relative">
                                    <section className="relative py-16 border-t border-slate-200 dark:border-slate-200/5">
                                        <h2 className="text-xl font-semibold text-slate-900 tracking-tight dark:text-white">
                                            Get all of our updates directly to your inbox.
                                            <br />
                                            Sign up for our newsletter.
                                        </h2>
                                        <div className="mt-5 max-w-md">
                                            <NewsletterForm 
                                                action={Config('app.convert_action_url')} 
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

export async function getStaticPaths() {
    const posts = getDocuments('posts', [
      'title',
      'author',
      'slug',
      'description',
      'coverImage',
      'publishedAt',
    ]);

    const paths = posts.map((post) => {
        if(post.status === "published"){
            return({
                params: { slug: post.slug }
            });
        }
    });
   
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { 
      paths, 
      fallback: false 
    };
}

export async function getStaticProps(context: GetServerSidePropsContext) {
    const post = getDocumentBySlug('posts', context.params?.slug as string, [
        'title',
        'status',
        'author',
        'slug',
        'description',
        'coverImage',
        'publishedAt',
        'content'    
    ]);

    let content = "";

    if(post.status === "published")
    {
        content = await MarkdownToHtml(post.content);
    }
    
    return {
        props: { 
            post,
            content,
        }
    };
}