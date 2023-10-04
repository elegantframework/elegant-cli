import { HeadingNode } from "@jsdevtools/rehype-toc/lib/types";
import { getInnerText } from "@jsdevtools/rehype-toc/lib/get-inner-text";
import { TableOfContentsItem } from '@/types/TableOfContentsItem';

/**
 * Create a table of contents items list.
 * @param headings A list of html headings from rehype.
 * @returns A table of contents item list.
 */
const CreateTocList = (
  headings: HeadingNode[]
) => {
  return createTocList(headings);
};

export default CreateTocList;

/**
 * Create a table of contents items list.
 * @param headings A list of html headings from rehype.
 * @returns A table of contents item list.
 */
function createTocList(headings: HeadingNode[]) {
  let levels: TocLevel[] = [];
  let currentLevel: TocLevel = {
    depth: 0,
    headingNumber: 0,
    list: []
  };

  for (let heading of headings) {
    let headingNumber = parseInt(heading.tagName.slice(-1), 10);

    if (headingNumber > currentLevel.headingNumber) {
      // This is a higher heading number, so start a new level
      let depth = currentLevel.depth + 1;
      let level = {
        depth,
        headingNumber,
        list: createList(heading, depth),
      };

      // Add the new list to the previous level's list
      if (currentLevel.list.length > 0) {
        let lastItem = currentLevel.list.slice(-1)[0];

        let item: TableOfContentsItem = {
          title: level.list[0].title,
          slug: level.list[0].slug,
          children: level.list[0].children
        };

        lastItem.children.push(
          item
        );
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
      let listItem = createListItem(heading);
      currentLevel.list.push(listItem);
    }
  }

  if (levels.length === 0) {
    return createList(undefined, 1);
  }
  else {
    return levels[0].list;
  }
}

function createList(heading: HeadingNode | undefined, depth: number) {
  let list = [];

  if (heading) {
    let listItem = createListItem(heading);
    list.push(listItem);
  }

  return list;
}

function createListItem(heading: HeadingNode) {
  let item: TableOfContentsItem = {
    title: getInnerText(heading),
    slug: heading.properties.id || "",
    children: []
  };

  return item;
}

interface TocLevel {
  depth: number;
  headingNumber: number;
  list: TableOfContentsItem[];
};