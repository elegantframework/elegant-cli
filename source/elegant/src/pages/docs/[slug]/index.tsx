import { getDocumentBySlug } from "@/utils/core/Collections/collection";
import { GetServerSideProps } from "next";
import { SidebarLayout, SidebarContext } from "@/layouts/SidebarLayout";
import { DocumentationHeading } from "@/components/core/Headings/DocumentationHeading";
import Error from "@/pages/404";
import MarkdownToHtml from "@/utils/core/Rehype/MarkdownToHtml";
import { useRouter } from "next/router";
import { documentationNav } from '@/config/Navigation';
import Head from 'next/head';
import AnalyticsHead from '@/components/core/Analytics/AnalyticsHead';
import Config from 'Config';
import Seo from "@/components/core/Seo/Seo";
import socialCardLarge from '@/img/social-card-large.jpg';
import MetaTitle from "@/utils/core/Meta/MetaTitle";
import HtmlToToc from "@/utils/core/Rehype/HtmlToToc";
import DocumentationLayout from "@/components/core/Layouts/DocumentationLayout";
import { Post } from "@/types/Post";

type Props = {
    /**
     * A documentation page to be displayed.
     */
    post: Post;
    /**
     * HTML string content.
     */
    content: string;
    /**
     * Table of contents html string.
     */
    toc: string;
};

/**
 * Our documentation page that dynamically loads .mdx files based on our url slug
 * @returns An html page for displaying documentation.
 */
export default function Index({
    post,
    content,
    toc
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

    if(post.coverImage){
        image = post.coverImage;
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
                <DocumentationLayout 
                    post={post}
                    content={content}
                    toc={toc}
                />
                {/* <div className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
                    <DocumentationHeading 
                        title={post.title}
                        description={post.description}
                        section={post.section}
                    />
                    <div
                        id="content-wrapper"
                        className="relative z-20 prose prose-slate mt-8 dark:prose-dark"
                    >
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </div> */}
                {/* <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
                    <div className="px-8">
                        <h5 className="text-slate-900 font-semibold mb-4 text-sm leading-6 dark:text-slate-100">
                            On this page
                        </h5>
                        <div dangerouslySetInnerHTML={{ __html: toc }} />
                    </div>
                </div> */}
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
        'content',
        'section'
    ]);

    const content = await MarkdownToHtml(post.content);
    const toc = await HtmlToToc(content);

    return {
        props: { 
            post,
            content,
            toc
        }
    };
};