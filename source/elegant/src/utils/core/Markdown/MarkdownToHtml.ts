import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

/**
 * Convert markdown content into html.
 * @param content Content in markdown format.
 * @returns An html string of content.
 */
export default async function MarkdownToHtml(content: string) {
    const file = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(content);
  
    return String(file);
}