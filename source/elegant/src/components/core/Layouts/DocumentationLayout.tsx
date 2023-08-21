import { Post } from "@/types/Post";
import { DocumentationHeading } from "../Headings/DocumentationHeading";
import TableOfContents from "../TableOfContents/TableOfContents";

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
    toc: string;
};

const DocumentationLayout = ({
    post,
    content,
    toc
}: Props) => {
    console.log(toc)

    return(
        <div className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
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
            {/* @TODO: Finish docs footer.. Update url path to new router format */}
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
            
            */}

            <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
                {/* {toc.length > 0 && (
                    <TableOfContents 
                        tableOfContents={toc} 
                        currentSection={""} 
                    />
                )} */}
            </div>
        </div>
    );
};

export default DocumentationLayout;