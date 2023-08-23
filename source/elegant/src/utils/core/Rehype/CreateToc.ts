import { getInnerText } from "@jsdevtools/rehype-toc/lib/get-inner-text";
import { buildClass, NormalizedOptions } from "@jsdevtools/rehype-toc/lib/options";
import { HeadingNode, HtmlElementNode, ListItemNode, ListNode } from "@jsdevtools/rehype-toc/lib/types";

interface TocLevel {
  depth: number;
  headingNumber: number;
  list: ListNode;
}

/**
 * Creates a `<nav>` and/or `<ol>` element containing the table of contents.
 */
export function createTOC(headings: HeadingNode[], options: NormalizedOptions): HtmlElementNode {
  let list = createTocList(headings, options);


  if (options.nav) {
    return {
      type: "element",
      tagName: "nav",
      properties: {
        className: options.cssClasses.toc || undefined,
      },
      children: [list],
    };
  }
  else {
    list.properties.className =
      [options.cssClasses.toc, list.properties.className].filter(Boolean).join(" ") || undefined;
    return list;
  }
}

/**
 * Creates an `<ol>` element containing the table of contents.
 */
function createTocList(headings: HeadingNode[], options: NormalizedOptions): HtmlElementNode {
  let levels: TocLevel[] = [];
  let currentLevel: TocLevel = {
    depth: 0,
    headingNumber: 0,
    list: undefined as unknown as ListNode,
  };

  for (let heading of headings) {
    let headingNumber = parseInt(heading.tagName.slice(-1), 10);

    if (headingNumber > currentLevel.headingNumber) {
      // This is a higher heading number, so start a new level
      let depth = currentLevel.depth + 1;
      let level = {
        depth,
        headingNumber,
        list: createList(heading, depth, options),
      };

      // Add the new list to the previous level's list
      if (currentLevel.list) {
        let lastItem = currentLevel.list.children.slice(-1)[0];
        lastItem.children.push(level.list);
      }

      levels.push(level);
      currentLevel = level;
    }
    else {
      if (headingNumber < currentLevel.headingNumber) {
        // This is a lower heading number, so we need to go up to a previous level
        for (let i = levels.length - 2; i >= 0; i--) {
          let level = levels[i];
          if (level.headingNumber === headingNumber) {
            // We found the previous level that matches this heading
            levels = levels.slice(0, i + 1);
            currentLevel = level;
            break;
          }
        }

        // If headings are in an incorrect order, then we may need to adjust the headingNumber
        currentLevel.headingNumber = Math.min(currentLevel.headingNumber, headingNumber);
      }

      // This heading is the same level as the previous heading,
      // so just add another <li> to the same <ol>
      let listItem = createListItem(heading, options);
      currentLevel.list.children.push(listItem);
    }
  }

  if (levels.length === 0) {
    return createList(undefined, 1, options);
  }
  else {
    return levels[0].list;
  }
}

/**
 * Creates an `<ol>` and `<li>` element for the given heading
 */
function createList(heading: HeadingNode | undefined, depth: number, options: NormalizedOptions): ListNode {
  let list: ListNode = {
    type: "element",
    tagName: "ul",
    properties: {
      className: buildClass(options.cssClasses.list, depth),
    },
    children: [],
  };

  if (heading) {
    let listItem = createListItem(heading, options);
    list.children.push(listItem);
  }

  return list;
}

/**
 * Creates an `<li>` element for the given heading
 */
function createListItem(heading: HeadingNode, options: NormalizedOptions): ListItemNode {
  return {
    type: "element",
    tagName: "li",
    data: {
      hookArgs: [heading],
    },
    properties: {
      className: buildClass(options.cssClasses.listItem, heading.tagName),
    },
    children: [
      {
        type: "element",
        // @ts-ignore
        tagName: "a",
        properties: {
          className: options.cssClasses.link,
          href: `#${heading.properties.id || ""}`,
        },
        children: [
          {
            type: "text",
            value: getInnerText(heading),
          }
        ]
      }
    ],
  };
}