import { Processor, Transformer } from "unified";
import { Node } from "unist";
import { customizationHooks } from "@jsdevtools/rehype-toc/lib/customization-hooks";
import { findHeadings } from "@jsdevtools/rehype-toc/lib/fiind-headings";
import { findMainNode } from "@jsdevtools/rehype-toc/lib/find-main-node";
import { insertTOC } from "@jsdevtools/rehype-toc/lib/insert-toc";
import { NormalizedOptions, Options } from "@jsdevtools/rehype-toc/lib/options";
import { createTOC } from "./CreateToc";

/**
 * This is a Rehype plugin that adds a table of contents (TOC) that links to all
 * the `<h1>` - `<h6>` headings no the page.
 */
export function toc(this: Processor, opts?: Options): Transformer {
  let options = new NormalizedOptions(opts);

  return function transformer(root: Node): Node {
    // Find the <main> or <body> element
    let [mainNode, mainParent] = findMainNode(root);

    // Find all heading elements
    let headings = findHeadings(mainNode, options);

    // Create the table of contents
    return createTOC(headings, options);
  };
}