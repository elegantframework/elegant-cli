import { Processor, Transformer } from "unified";
import { Node } from "unist";
import { customizationHooks } from "@jsdevtools/rehype-toc/lib/customization-hooks";
import { findHeadings } from "@jsdevtools/rehype-toc/lib/fiind-headings";
import { findMainNode } from "@jsdevtools/rehype-toc/lib/find-main-node";
import { insertTOC } from "@jsdevtools/rehype-toc/lib/insert-toc";
import { NormalizedOptions, Options } from "@jsdevtools/rehype-toc/lib/options";
import CreateTocList from "./CreateTocList";

export function toc(root: Node) {
  let options = new NormalizedOptions;

  // Find the <main> or <body> element
  let [mainNode] = findMainNode(root);

  // Find all heading elements
  let headings = findHeadings(mainNode, options);

  return CreateTocList(headings);
}