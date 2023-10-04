import { Node } from "unist";
import { findHeadings } from "@jsdevtools/rehype-toc/lib/fiind-headings";
import { findMainNode } from "@jsdevtools/rehype-toc/lib/find-main-node";
import { NormalizedOptions, Options } from "@jsdevtools/rehype-toc/lib/options";
import CreateTocList from "./CreateTocList";

export function toc(root: Node) {
  let options: Options = {
    headings: ['h1', 'h2']
  }; 

  // Find the <main> or <body> element
  let [mainNode] = findMainNode(root);

  // Find all heading elements
  let headings = findHeadings(mainNode, options as NormalizedOptions);

  return CreateTocList(headings);
}