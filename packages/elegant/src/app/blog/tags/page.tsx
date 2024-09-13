import Header from "@/components/Header";
import { Metadata } from "next";
import { getAllPublishedTagsForCollection } from "@/utils/Db/Actions/Post";
import { Suspense } from "react";
import Link from "next/link";

export const metadata: Metadata = {
    title: `Tags - ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} - All the latest ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} news, straight from the team.`,
    description: `All the latest ${process.env.NEXT_PUBLIC_APP_NAME || `Elegant`} news, straight from the team.`,
};

async function getTags() {
    return await getAllPublishedTagsForCollection('posts');
}

export default async function Blog() {   
    const posts: {
        tags: string[],
    }[] = await getTags() || [];

    let tags: string[] = [];

    posts.forEach(post => {
        post.tags?.forEach(tag => {
            if(!tags.includes(tag)) {
                tags.push(tag);
            }
        })
    });

    return(
        <Suspense>
            <Header />
            <main className="h-screen max-w-[52rem] mx-auto px-4 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl">
                <div className="py-16 mt-20 sm:text-center">
                    <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl md:text-6xl text-slate-900 dark:text-slate-200">
                        Explore Our Blog Tags                    
                    </h1>
                    <p className="mt-4 mb-8 text-xl text-slate-600 dark:text-slate-100">
                        Discover articles on your favorite topics
                    </p>
                    <div className="w-full border-t border-gray-300" />
                    <div className='flex flex-wrap justify-center mt-4'>
                        {tags.map((tag) => (
                            <div className='my-2 mr-5' key={tag}>
                                <Link 
                                    className='mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                                    href={`/blog/tags/${tag}`}
                                    key={tag}
                                >
                                    {tag.toUpperCase()}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </Suspense>
    );
}