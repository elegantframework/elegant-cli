import { getDocumentBySlug, getDocuments } from "@/utils/Collections/collection";
import { GetServerSidePropsContext } from "next";
import Error from "@/pages/404";
import MarkdownToHtml from "@/utils/Rehype/MarkdownToHtml";
import { useRouter } from "next/router";
import HtmlToToc from "@/utils/Rehype/HtmlToToc";
import DocumentationLayout from "@/components/Layouts/DocumentationLayout";
import { Post } from "@/types/Post";
import { DocumentationHeading } from "@/components/Headings/DocumentationHeading";
import TableOfContents from "@/components/TableOfContents/TableOfContents";
import { TableOfContentsItem } from "@/types/TableOfContentsItem";
import { createContext, useEffect } from "react";
import { usePrevNext } from "@/utils/Hooks/usePrevNext";
import DocsFooter from "@/components/Footer/DocsFooter/DocsFooter";
import Config from 'Config';
import Link from "next/link";
import { documentationNav } from "@/config/Navigation";
import Seo from "@/components/Seo/Seo";
import useHeaderStore from "@/utils/Hooks/useHeaderStore";
import useTableOfContents from "@/utils/Hooks/useTableOfContents";
import socialCardLarge from '@/img/social-card-large.jpg';

export const ContentsContext = createContext({});

interface Props {
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
    toc: TableOfContentsItem[];
};

Index.layoutProps = {
    Layout: DocumentationLayout
}

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

    let currentSection = useTableOfContents(toc, router);

    let { prev, next } = usePrevNext();
    const setSection = useHeaderStore((state) => state.setSection);
    const setTitle = useHeaderStore((state) => state.setTitle);

    let section = "";
    let sectionIndex = parseInt(
        Object.entries(documentationNav).find(([, items]) =>
            items.links.find(({ href }) => href === router.asPath.split('#')[0])
        )?.[0] || ""
    );
    
    if(sectionIndex) {
        section = documentationNav[sectionIndex].title;
    }

    useEffect(() => {
        setSection(section);
        setTitle(post.title);
    }, [section]);

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
                url={`${url}${router.asPath.split('#')[0]}`}
                image={`${url}${image}`}
            />
            <div className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
                <DocumentationHeading 
                    title={post.title}
                    section={section}
                />
                <ContentsContext.Provider value={{}}>
                    <div
                        id="content-wrapper"
                        className="relative z-20 prose prose-slate mt-8 dark:prose-dark"
                    >
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                    <DocsFooter previous={prev} next={next}>
                        {Config('app.repository').length > 0 &&
                            <Link
                                href={`${Config('app.repository')}/edit/main/${Config('admin.cms_monorepo_path')}${Config('admin.cms_content_path')}/docs/${post.slug}.mdx`}
                                className="hover:text-slate-900 dark:hover:text-slate-400"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Edit this page on GitHub
                            </Link>
                        }
                    </DocsFooter>
                    <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
                        {toc.length > 0 && (
                            <TableOfContents 
                                tableOfContents={toc} 
                                currentSection={currentSection} 
                            />
                        )}
                    </div>
                </ContentsContext.Provider>
            </div>
        </>
    );
};

export async function getStaticPaths() {
    const posts = getDocuments('docs', [
      'title',
      'author',
      'slug',
      'description',
      'coverImage',
      'publishedAt',
    ]);
   
    // Get the paths we want to pre-render based on posts
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

    let content = "";
    let toc: TableOfContentsItem[] = [];

    if(post.status === "published")
    {
        content = await MarkdownToHtml(post.content);
        toc = await HtmlToToc(content);
    }
    
    return {
        props: { 
            post,
            content,
            toc
        }
    };
};