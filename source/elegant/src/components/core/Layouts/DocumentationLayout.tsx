import { Post } from "@/types/Post";
import { Heading } from "@/types/Heading";
import { DocumentationHeading } from "../Headings/DocumentationHeading";
import TableOfContents from "../TableOfContents/TableOfContents";
import { TableOfContentsItem } from "@/types/TableOfContentsItem";
import { createContext, useCallback, useEffect, useState } from "react";
import DocsFooter from "../Footer/DocsFooter/DocsFooter";
import Config from "@/utils/core/Config/Config";
import Link from "next/link";
import { usePrevNext } from "@/utils/core/Hooks/usePrevNext";

export const ContentsContext = createContext({});

interface Props {
    /**
     * The documentation item to be displayed.
     */
    post: Post;
    /**
     * The HTML string content.
     */
    content: string;
    /**
     * Table of contents html string.
     */
    toc: [];
};

/**
 * The layout component for documentation pages.
 * @returns An html page for displaying documentation.
 */
const DocumentationLayout = ({
    post,
    content,
    toc
}: Props) => {
    const { currentSection, registerHeading, unregisterHeading } = useTableOfContents(toc);
    let { prev, next } = usePrevNext();

    return (
        <div className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
            <DocumentationHeading 
                title={post.title}
                description={post.description}
                section={post.section}
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
                          rel="noopener noreferrer">
                        
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
    );
};

export default DocumentationLayout;

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