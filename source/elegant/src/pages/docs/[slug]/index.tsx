import { getDocumentBySlug } from "@/utils/core/Collections/collection";
import { GetServerSideProps } from "next";
import { SidebarLayout } from "@/layouts/SidebarLayout";
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
     * Table of contents item list.
     */
    toc: [];
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