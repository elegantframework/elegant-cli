import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import smartypants from 'remark-smartypants';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkHtml from 'remark-html';
import { withTableOfContents } from './../../../../remark/withTableOfContents.mjs';

/**
 * Convert markdown content into html.
 * @param content Content in markdown format.
 * @returns An html string of content.
 */
export default async function MarkdownToHtml(content: string) {
    const file = await unified()
      .use(smartypants)
      .use(remarkUnwrapImages)
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkHtml)
      .process(content);
  
    return String(file);
}