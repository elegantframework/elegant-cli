'use client'

import Header from "@/components/Header";
import { useState } from "react";
import { documentationNav } from "./navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import DocumentationHeading from "@/components/DocumentationHeading";
import DocsFooter from "@/components/DocsFooter";
import { TableOfContentsItem } from "@/components/Types";
import useTableOfContents from "@/utils/Hooks/useTableOfContents";
import TableOfContents from "@/components/TableOfContents";

export interface DocsPageProps {
    post:  {
        title: string;
        slug: string;
        description: string;
        publishedAt: Date;
        coverImage: string | null;
    };
    content: string;
    toc: TableOfContentsItem[];
};

export default function DocsPage ({
    post,
    content,
    toc
}: DocsPageProps) {
    const [ navIsOpen, setNavIsOpen ] = useState(false);
    let currentSection = useTableOfContents(toc);

    return(
        <>
            <Header 
                title={post.title}
                hasNav={true} 
                nav={documentationNav}
                onNavToggle={() => setNavIsOpen(true)}
            />
            <Sidebar 
                nav={documentationNav}
                navIsOpen={navIsOpen}
                closeNav={() => setNavIsOpen(false)}
            >
                <div className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
                    <DocumentationHeading 
                        title={post.title}
                        nav={documentationNav}
                    />
                    <div
                        id="content-wrapper"
                        className="relative z-20 prose prose-slate mt-8 dark:prose-dark tiptap ProseMirror"
                    >
                        <div dangerouslySetInnerHTML={{ __html: content}} />
                    </div>
                    <DocsFooter 
                        nav={documentationNav}
                    />
                     <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
                        {toc.length > 0 && (
                            <TableOfContents 
                                tableOfContents={toc} 
                                currentSection={currentSection} 
                            />
                        )}
                    </div>
                </div>
            </Sidebar> 
        </>
    );
}