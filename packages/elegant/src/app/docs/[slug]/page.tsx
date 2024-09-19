import NotFound from "@/app/not-found";
import { getPublishedPostBySlug } from "@/utils/Db/Actions/Post";
import MetaTitle from "@/utils/Meta/MetaTitle";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import "@/components/Editor/css/editor.css";
import MarkdownToHtml from "@/utils/Rehype/MarkdownToHtml";
import DocsPage from "./docs-page";
import HtmlToToc from "@/utils/Rehype/HtmlToToc";

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
      description: `${post?.description || process.env.NEXT_PUBLIC_APP_DESCRIPTION || ""}`,
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

    const content = await MarkdownToHtml(post.content || "");
    
    return(
        <Suspense>
            <DocsPage 
                post={post}
                content={content}
                toc={
                    await HtmlToToc(content)
                }
            />
        </Suspense>
    ); 
}