import Header from "@/components/Header";
import { Metadata } from "next";
import BlogPage from "./BlogPage";
import { getAllPostsForCollection } from "@/utils/Db/Actions/Post";
import { Author } from "@/components/Types";

export const metadata: Metadata = {
    title: `Blog - ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} - All the latest ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} news, straight from the team.`,
    description: `All the latest ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} news, straight from the team.`,
};

async function getPosts() {
    return await getAllPostsForCollection('posts');
}

export default async function Blog() {   
    const posts: {
        title: string;
        slug: string;
        description: string;
        publishedAt: Date;
    }[] = await getPosts();

    return(
        <>
            <Header />
            <BlogPage posts={posts} />
        </>
    );
}