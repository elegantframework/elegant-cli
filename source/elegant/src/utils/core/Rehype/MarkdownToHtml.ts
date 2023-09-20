import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import smartypants from 'remark-smartypants';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeRewrite from 'rehype-rewrite';

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
      .use(remarkRehype, {allowDangerousHtml: true})
      .use(rehypeRewrite, {
        rewrite: (node) => {
          if (
            node.type === 'element' && node.properties && (
              node.tagName === 'h1' ||
              node.tagName === 'h2' ||
              node.tagName === 'h3'
            )
          ) {
            node.properties.className = '-ml-4 flex group pl-4 whitespace-pre-wrap';
          }
        }
      })
      .use(rehypeSlug)
      // .use(rehypePrism)
      .use(rehypeAutolinkHeadings, {
        properties: {
          className: "absolute -ml-10 mt-[3px] flex items-center opacity-0 border-0 group-hover:opacity-100",
          ariaLabel: "Anchor"
        },
        content: {
          type: 'element', tagName: 'div', properties: {className: [
            'w-6 h-6 text-slate-400 ring-1 ring-slate-900/5 rounded-md shadow-sm flex items-center justify-center hover:ring-slate-900/10 hover:shadow hover:text-slate-700 dark:bg-slate-700 dark:text-slate-300 dark:shadow-none dark:ring-0'
          ]}, children: [
            {
              type: 'element',
              tagName: 'svg',
              properties: {
                width: '12',
                height: '12',
                fill: 'none',
                ariaHidden: 'true'
              },
              children: [
                {
                  type: 'element',
                  tagName: 'path',
                  properties: {
                    d: 'M3.75 1v10M8.25 1v10M1 3.75h10M1 8.25h10',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round'
                  },
                  children: []
                }
              ]
            },
          ],
        },
      })
      .use(rehypeStringify, {allowDangerousHtml: true})
      .process(content);
  
    return String(file);
}