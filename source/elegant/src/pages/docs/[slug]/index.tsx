import { getDocumentBySlug } from "@/utils/core/Collections/collection";
import { GetServerSideProps } from "next";
import { SidebarLayout, SidebarContext } from "@/layouts/SidebarLayout";
import { DocumentationHeading } from "@/components/core/Headings/DocumentationHeading";
import Error from "@/pages/404";
import MarkdownToHtml from "@/utils/core/Markdown/MarkdownToHtml";
import { useRouter } from "next/router";
import { documentationNav } from '@/config/Navigation';
import Head from 'next/head';
import AnalyticsHead from '@/components/core/Analytics/AnalyticsHead';
import Config from 'Config';
import Seo from "@/components/core/Seo/Seo";
import socialCardLarge from '@/img/social-card-large.jpg';
import MetaTitle from "@/utils/core/Meta/MetaTitle";

type Props = {
    /**
     * 
     */
    post: any;
    /**
     * HTML string content.
     */
    content: string;
};

/**
 * Our documentation page that dynamically loads .mdx files based on our url slug
 * @returns An html page for displaying documentation.
 */
export default function Index({
    post,
    content
}: Props) {
    const router = useRouter();

    if (!router.isFallback && !post?.slug) {
        return (
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

    if(post.image){
        image = post.image;
    }

    return(
        <>
             <Head>
                <AnalyticsHead googleAnalyticsID={Config('app.google_analytics_id')}/>
            </Head>
            <Seo 
                title={`${post.title} - ${MetaTitle(Config('app.name'), Config('app.tagline'))}`}
                description={post.description || Config('app.description')}
                themeColor={"#f8fafc"}
                twitterHandle={Config('app.twitter_handle')}
                twitterSite={Config('app.twitter_handle')}
                siteName={Config('app.name')}
                url={`${url}${router.pathname}`}
                image={`${url}${image}`}
                facebookAppID={Config('app.facebook_app_id')}
                pageType={'website'}
            />
            <SidebarLayout
                navIsOpen={false}
                setNavIsOpen={() => {}}
                nav={documentationNav}
                sidebar={null}
                fallbackHref={null}
            >
                <div className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
                    <DocumentationHeading 
                        title={post.title}
                        description={post.description}
                        section={"Hey now"}
                    />
                    <div
                        id="content-wrapper"
                        className="relative z-20 prose prose-slate mt-8 dark:prose-dark"
                    >
                        <div
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
            
                    {/* <DocsFooter previous={prev} next={next}>
                    {Config('app.repository').length > 0 &&
                        <Link
                        href={`${Config('app.repository')}/edit/main/source/elegant/src/pages${router.pathname}.mdx`}
                        >
                        <a 
                            className="hover:text-slate-900 dark:hover:text-slate-400"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Edit this page on GitHub
                        </a>
                        </Link>
                    }
                    </DocsFooter>
            
                    <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
                    {toc.length > 0 && (
                        <TableOfContents tableOfContents={toc} currentSection={currentSection} />
                    )}
                    </div> */}
                </div>
            </SidebarLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const post = getDocumentBySlug('docs', context.params?.slug as string, [
        'title',
        'status',
        'author',
        'slug',
        'description',
        'coverImage',
        'publishedAt',
        'content'
    ]);

    const content = await MarkdownToHtml(post.content);

    return {
        props: { 
            post,
            content
        }
    };
};