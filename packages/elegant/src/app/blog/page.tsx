import Header from "@/components/Header";
import { Metadata } from "next";
import BlogPage from "./BlogPage";
import { getAllPublishedPostsForCollection } from "@/utils/Db/Actions/Post";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: `Blog - ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} - All the latest ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} news, straight from the team.`,
    description: `All the latest ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} news, straight from the team.`,
};

async function getPosts() {
    if(process.env.POSTGRES_PRISMA_URL && process.env.POSTGRES_PRISMA_URL?.length > 0) {
        return await getAllPublishedPostsForCollection('posts');
    }

    return[];
}

export default async function Blog() {   
    const posts: {
        title: string;
        slug: string;
        description: string;
        publishedAt: Date;
    }[] = await getPosts();

    return(
        <Suspense>
            <Header />
            <BlogPage posts={posts} />
        </Suspense>
    );
}