import GenerateRssFeed from "@/utils/RSS/GenerateRSSFeed";

export async function GET() {
    return new Response(
        await GenerateRssFeed("atom"),
        { headers: { "Content-Type": "text/xml" } }
    );
}