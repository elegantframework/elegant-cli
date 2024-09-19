import { Feed } from 'feed';
import { getAllPublishedPostsForCollection } from '../Db/Actions/Post';

/**
 * Generate an RSS feed for the web application.
 */
export default async function GenerateRssFeed(type: "xml" | "json" | "atom") {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
    const blogUrl = `${baseUrl}/blog`;

    // setup our feed
    const feed = new Feed({
        title: `${process.env.NEXT_PUBLIC_APP_NAME || "Elegant"} Blog`,
        description: `All the latest ${process.env.NEXT_PUBLIC_APP_NAME || "Elegant"} news, straight from the team.`,
        id: blogUrl,
        link: blogUrl,
        language: 'en',
        image: `${baseUrl}/logo.svg`,
        favicon: `${baseUrl}/icon.ico`,
        copyright: `All rights reserved ${new Date().getFullYear()}, ${process.env.NEXT_PUBLIC_APP_NAME || "Elegant"}`,
        feedLinks: {
          rss: `${baseUrl}/feeds/feed.xml`,
          json: `${baseUrl}/feeds/feed.json`,
          atom: `${baseUrl}/feeds/atom.xml`,
        }
    });

    // get our posts
    const posts = await getAllPublishedPostsForCollection('posts') || [];

    // add each post to the feed
    posts.forEach((post) => {
        feed.addItem({
            title: post.title,
            id: post.title,
            link: `${blogUrl}/${post.slug}`,
            description: post.description,
            date: new Date(post.publishedAt || ""),
        });
    });

    let result;

    if(type === "xml"){
        result = feed.rss2();
    }

    if(type === "json"){
        result = feed.json1();
    }

    if(type === "atom"){
        result = feed.atom1();
    }

    return result;
}