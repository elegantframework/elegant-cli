import { getDocumentBySlug, getDocuments } from "@/utils/core/Collections/collection";
import { GetServerSidePropsContext } from "next";
import Error from "@/pages/404";
import MarkdownToHtml from "@/utils/core/Rehype/MarkdownToHtml";
import { useRouter } from "next/router";
import HtmlToToc from "@/utils/core/Rehype/HtmlToToc";
import DocumentationLayout from "@/components/core/Layouts/DocumentationLayout";
import { Post } from "@/types/Post";
import { DocumentationHeading } from "@/components/core/Headings/DocumentationHeading";
import TableOfContents from "@/components/core/TableOfContents/TableOfContents";
import { TableOfContentsItem } from "@/types/TableOfContentsItem";
import { createContext, useCallback, useEffect, useState } from "react";
import { usePrevNext } from "@/utils/core/Hooks/usePrevNext";
import { Heading } from "@/types/Heading";
import DocsFooter from "@/components/core/Footer/DocsFooter/DocsFooter";
import Config from "@/utils/core/Config/Config";
import Link from "next/link";
import { documentationNav } from "@/config/Navigation";
import Seo from "@/components/core/Seo/Seo";

export const ContentsContext = createContext({});

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

    const { currentSection, registerHeading, unregisterHeading } = useTableOfContents(toc);
    let { prev, next } = usePrevNext();

    let section = "";
    let sectionIndex = parseInt(
        Object.entries(documentationNav).find(([, items]) =>
            items.links.find(({ href }) => href === router.asPath)
        )?.[0] || ""
    );
    
    if(sectionIndex) {
        section = documentationNav[sectionIndex].title;
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

    return(
        <>
            <Seo 
                title={`${post.title} - ${Config('app.description')}`}
                description={post.description || Config('app.description')}
                themeColor={"#f8fafc"}
                url={`${url}${router.asPath}`}
                image={`${url}${post.coverImage}`}
            />
            <div className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
                <DocumentationHeading 
                    title={post.title}
                    description={post.description}
                    section={section}
                />
                <ContentsContext.Provider value={{ registerHeading, unregisterHeading }}>
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

/**
 * 
 * @param tableOfContents 
 * @returns 
 */
function useTableOfContents(tableOfContents: TableOfContentsItem[]) {

    let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.slug)
    let [headings, setHeadings] = useState<Heading[]>([])
  
    const registerHeading = useCallback((id: string) => {
        setHeadings((headings) => [...headings.filter((h) => id !== h.id), { id, top: getTop(id) }])
    }, [])
  
    const unregisterHeading = useCallback((id: string) => {
        setHeadings((headings) => headings.filter((h) => id !== h.id))
    }, [])
  
    useEffect(() => {
      if (tableOfContents.length === 0 || headings.length === 0) {
        return;
      }
  
      function onScroll() {
        let style = window.getComputedStyle(document.documentElement)
        let scrollMt = parseFloat(style.getPropertyValue('--scroll-mt').match(/[\d.]+/)?.[0] as string ?? 0)
        let fontSize = parseFloat(style.fontSize.match(/[\d.]+/)?.[0] as string ?? 16)
        scrollMt = scrollMt * fontSize;
        
        let sortedHeadings = headings.concat([]).sort((a, b) => a.top - b.top)
        let top = window.pageYOffset + scrollMt + 1
        let current = sortedHeadings[0].id
        for (let i = 0; i < sortedHeadings.length; i++) {
          if (top >= sortedHeadings[i].top) {
            current = sortedHeadings[i].id
          }
        }
        setCurrentSection(current)
      }
  
      window.addEventListener('scroll', onScroll, {
        capture: true,
        passive: true,
      })
  
      onScroll()
  
      let resizeObserver = new window.ResizeObserver(() => {
        for (let heading of headings) {
          heading.top = getTop(heading.id)
        }
      })
  
      resizeObserver.observe(document.body)
      return () => {
        resizeObserver.disconnect()
        window.removeEventListener('scroll', onScroll, {
          capture: true,
          //@ts-ignore
          passive: true,
        })
      }
    }, [headings, tableOfContents])
  
    return { currentSection, registerHeading, unregisterHeading }
  }

function getTop(id: string) {
    //@ts-ignore
    return document.getElementById(id).getBoundingClientRect().top + window.scrollY;
}