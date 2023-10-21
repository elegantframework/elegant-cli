import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { toc } from '@/utils/Rehype/RehypeToc';

/**
 * Convert html content into an auto generated table of contents.
 * @param content Content in html format.
 * @returns An html string of content.
 */
export default async function HtmlToToc(content: string) {

  const file = await unified()
  .use(rehypeParse)
  .parse(content)
  
  return toc(file);
}