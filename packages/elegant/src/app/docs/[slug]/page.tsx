import NotFound from "@/app/not-found";
import DocumentationHeading from "@/components/DocumentationHeading";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { getPublishedPostBySlug } from "@/utils/Db/Actions/Post";
import MetaTitle from "@/utils/Meta/MetaTitle";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import "@/components/Editor/css/editor.css";
import DocsFooter from "@/components/DocsFooter";
import MarkdownToHtml from "@/utils/Rehype/MarkdownToHtml";

async function getPost(slug: string) {
    return await getPublishedPostBySlug(slug, 'docs');
}

export async function generateMetadata(
    { params }: { params: { slug: string } },
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const post: {
        title: string;
        slug: string;
        description: string;
        content: string | null;
        publishedAt: Date;
        coverImage: string | null;
    } | null = await getPost(params.slug);

    if(!post){
        return {
            title: `Page not found - ${
                MetaTitle(
                    process.env.NEXT_PUBLIC_APP_NAME || "Elegant", 
                    process.env.NEXT_PUBLIC_APP_TAGLINE || ""
                )
            }`
        };
    }

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
   
    return {
      title: `${post?.title} - ${
        MetaTitle(
            process.env.NEXT_PUBLIC_APP_NAME || "Elegant", 
            process.env.NEXT_PUBLIC_APP_TAGLINE || ""
        )
      }`,
      description: `${post?.description || process.env.NEXT_PUBLIC_APP_DESCRIPTION}`,
      openGraph: {
        images: [post?.coverImage || "", ...previousImages],
      },
    }
}


export default async function Docs({ params }: { params: { slug: string } }) {  
    const post: {
        title: string;
        slug: string;
        description: string;
        content: string | null;
        publishedAt: Date;
        coverImage: string | null;
    } | null = await getPost(params.slug);

    if(!post){
        return(
            <NotFound />
        );
    }   
    
    return(
        <>
            <Suspense>
                <Header />
            </Suspense>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                <Suspense>
                    {/* <Sidebar nav={[{
                        title: "Welcome",
                        links: [
                        {
                            title: "Welcome to Elegant",
                            href: "/docs/welcome"
                        },
                        {
                            title: "Welcome to Elegant",
                            href: "/docs/welcome"
                        },
                        {
                            title: "Welcome to Elegant",
                            href: "/docs/welcome"
                        },
                        {
                            title: "Welcome to Elegant",
                            href: "/docs/welcome"
                        },
                        {
                            title: "Welcome to Elegant",
                            href: "/docs/welcome"
                        },
                        {
                            title: "Welcome to Elegant",
                            href: "/docs/welcome"
                        },
                        ]
                    }]}>
                        <></>
                    </Sidebar> */}
                </Suspense>
                <div className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
                    <DocumentationHeading 
                        title={post.title}
                        section={"Hello again"}
                    />
                    <div
                        id="content-wrapper"
                        className="relative z-20 prose prose-slate mt-8 dark:prose-dark tiptap ProseMirror"
                    >
                        <div dangerouslySetInnerHTML={{ __html: await MarkdownToHtml(post.content || "")}} />
                    </div>
                    <DocsFooter 
                        nav={[{
                            title: "Welcome",
                            links: [
                            {
                                title: "Welcome to Elegant",
                                href: "/docs/welcome"
                            },
                            {
                                title: "Welcome to Elegant",
                                href: "/docs/welcome"
                            },
                            {
                                title: "Welcome to Elegant",
                                href: "/docs/welcome"
                            },
                            {
                                title: "Welcome to Elegant",
                                href: "/docs/welcome"
                            },
                            {
                                title: "Welcome to Elegant",
                                href: "/docs/welcome"
                            },
                            {
                                title: "Welcome to Elegant",
                                href: "/docs/welcome"
                            },
                            ]
                        }]}
                    />
                </div>
            </div>
        </>
    ); 
}