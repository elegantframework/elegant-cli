import Header from "@/components/Header";
import { Metadata } from "next";
import { getAllPageViews, getAllPublishedPostsForTag } from "@/utils/Db/Actions/Post";
import { Suspense } from "react";
import TagsPage from "./tags-page";

export const metadata: Metadata = {
    title: `Tags - ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} - All the latest ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} news, straight from the team.`,
    description: `All the latest ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} news, straight from the team.`,
};

async function getPosts(tag: string) {
    return await getAllPublishedPostsForTag(tag, 'posts');
}

export default async function Tag({ params }: { params: { slug: string } }) {   
    const posts: {
        title: string;
        slug: string;
        tags: string[],
        description: string;
        publishedAt: Date;
    }[] | null = await getPosts(params.slug);
    const views = await getAllPageViews();

    return(
        <Suspense>
            <Header />
            <TagsPage posts={posts || []} views={views || []}/>
        </Suspense>
    );
}