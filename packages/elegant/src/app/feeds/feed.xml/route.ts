import GenerateRssFeed from "@/utils/RSS/GenerateRSSFeed";

export async function GET() {
    return new Response(
        await GenerateRssFeed("xml"),
        { headers: { "Content-Type": "text/xml" } }
    );
}