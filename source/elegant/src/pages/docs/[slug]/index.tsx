import { getDocumentBySlug } from "@/utils/core/Collections/collection";
import { GetServerSideProps } from "next";
import { DocumentationLayout } from '@/layouts/DocumentationLayout';
import { DocumentationHeading } from "@/components/core/Headings/DocumentationHeading";
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from '@/utils/mdxComponents';

import { withTableOfContents } from "./../../../../remark/withTableOfContents.mjs";

type Props = {
    /**
     * 
     */
    post: any,
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

    // const { currentSection, registerHeading, unregisterHeading } = useTableOfContents(toc);

    // withTableOfContents();

    return(
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

            {/* <ContentsContext.Provider value={{ registerHeading, unregisterHeading }}>
                {classes ? (
                    <>
                    <ClassTable {...classes} />
                    <div
                        id="content-wrapper"
                        className="relative z-20 prose prose-slate mt-12 dark:prose-dark"
                    >
                        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
                    </div>
                    </>
                ) : (
                    <div
                    id="content-wrapper"
                    className="relative z-20 prose prose-slate mt-8 dark:prose-dark"
                    >
                    <MDXProvider components={mdxComponents}>{children}</MDXProvider>
                    </div>
                )}
            </ContentsContext.Provider> */}
    
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
    );
};

Index.layoutProps = {
    Layout: DocumentationLayout
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

    const content = await markdownToHtml(post.content)

    return {
        props: { 
            post,
            content
        }
    };
};

/**
 * Convert markdown content into html.
 * @param content Content in markdown format.
 * @returns An html string of content.
 */
async function markdownToHtml(content: string) {
    const file = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(content);
  
    return String(file);
}