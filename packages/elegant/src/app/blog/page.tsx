import Header from "@/components/Header";
import { Metadata } from "next";
import BlogPage from "./blog-page";
import { getAllPageViews, getAllPublishedPostsForCollection } from "@/utils/Db/Actions/Post";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: `Blog - ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} - All the latest ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} news, straight from the team.`,
    description: `All the latest ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} news, straight from the team.`,
};

async function getPosts() {
    return await getAllPublishedPostsForCollection('posts');
}

export default async function Blog() {   
    const posts: {
        title: string;
        slug: string;
        tags: string[],
        description: string;
        publishedAt: Date;
    }[] | null = await getPosts();
    const views = await getAllPageViews();

    return(
        <Suspense>
            <Header />
            <BlogPage posts={posts || []} views={views || []}/>
        </Suspense>
    );
}