import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { toc } from '@/utils/core/Rehype/RehypeToc';

/**
 * Convert html content into an auto generated table of contents.
 * @param content Content in html format.
 * @returns An html string of content.
 */
export default async function HtmlToToc(content: string) {

  const file = await unified()
  .use(rehypeParse)
  .use(toc, {
    headings: ["h1", "h2", "h3", "h4"],
    cssClasses: {
      list: "text-slate-700 text-sm leading-6",
      listItem: "",
      link: "block py-1 font-medium font-medium text-primary-500 dark:text-primary-400"
    }
  })
  .use(rehypeStringify)
  .process(content);
  
    return String(file);
}