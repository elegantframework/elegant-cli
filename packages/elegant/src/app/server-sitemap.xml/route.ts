import { getAllPublishedPostsForCollection } from '@/utils/Db/Actions/Post';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export const dynamic = 'force-dynamic';

export async function GET() {
    const posts = await getAllPublishedPostsForCollection('posts');
    const docs = await getAllPublishedPostsForCollection('docs');
  
    let urls: ISitemapField[] = [];

    if(posts) {
        posts.forEach(post => {
            urls.push({
                loc: `${process.env.NEXT_PUBLIC_APP_URL || ""}/blog/${post.slug}`,
                lastmod: new Date(post.publishedAt).toISOString(),
                changefreq: "daily",
                priority: 0.7
            });
        });
    }

    if(docs) {
        docs.forEach(post => {
            urls.push({
                loc: `${process.env.NEXT_PUBLIC_APP_URL || ""}/docs/${post.slug}`,
                lastmod: new Date(post.publishedAt).toISOString(),
                changefreq: "daily",
                priority: 0.7
            });
        });
    }

    return getServerSideSitemap(urls);
  }

