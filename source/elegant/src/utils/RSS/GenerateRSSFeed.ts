import { Feed } from 'feed';
import Config from 'Config';
import { getDocuments } from '../Collections/collection';
import fs from 'fs';

/**
 * Generate an RSS feed for the web application.
 */
export default async function GenerateRssFeed() {
    const baseUrl = Config('app.url');
    const blogUrl = `${baseUrl}/blog`;

    // setup our feed
    const feed = new Feed({
        title: 'Elegant Framework Blog',
        description: 'All the latest Elegant Framework news, straight from the team.',
        id: blogUrl,
        link: blogUrl,
        language: 'en',
        image: `${baseUrl}/favicons/favicon-32x32.png?v=3`,
        favicon: `${baseUrl}/favicons/favicon.ico?v=3`,
        copyright: `All rights reserved ${new Date().getFullYear()}, Elegant, Inc.`,
        feedLinks: {
          rss: `${baseUrl}/feeds/feed.xml`,
          json: `${baseUrl}/feeds/feed.json`,
          atom: `${baseUrl}/feeds/atom.xml`,
        }
    });

    // get our posts
    const posts = getDocuments('posts', [
        'title',
        'author',
        'slug',
        'description',
        'coverImage',
        'publishedAt',
    ]);

    // add each post to the feed
    posts.forEach((post) => {
        if(post.status === "published"){
            feed.addItem({
                title: post.title,
                id: post.title,
                link: `${blogUrl}/${post.slug}`,
                description: post.description,
                date: new Date(post.publishedAt || ""),
            });
        }
    });

    // save the feed
    fs.mkdirSync('./public/feeds', { recursive: true });
    fs.writeFileSync('./public/feeds/feed.xml', feed.rss2());
    fs.writeFileSync('./public/feeds/atom.xml', feed.atom1());
    fs.writeFileSync('./public/feeds/feed.json', feed.json1());
}