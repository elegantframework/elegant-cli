import { Heading } from "@/types/Heading";
import { TableOfContentsItem } from "@/types/TableOfContentsItem";
import { NextRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * A table of contents hook method.
 * @param tableOfContents The table of contents list.
 * @param router The next router.
 * @returns The current active section.
 */
export default function useTableOfContents(
    tableOfContents: TableOfContentsItem[], 
    router: NextRouter
) {
    let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.slug);
  
    useEffect(() => {
        let headingList: Heading[] = getHeadingList(tableOfContents);
  
        function onScroll() {
            let style = window.getComputedStyle(document.documentElement);
            let scrollMt = parseFloat(style.getPropertyValue('--scroll-mt').match(/[\d.]+/)?.[0] as string ?? 0);
            let fontSize = parseFloat(style.fontSize.match(/[\d.]+/)?.[0] as string ?? 16);
            scrollMt = scrollMt * fontSize;
            
            let sortedHeadings = headingList.concat([]).sort((a, b) => a.top - b.top);
            let top = window.pageYOffset + scrollMt + 1;
            let current = "";

            // set the current heading if it exists
            if(sortedHeadings.length > 0){
                current = sortedHeadings[0].id;
            }

            for (let i = 0; i < sortedHeadings.length; i++) {
                if (top >= sortedHeadings[i].top) {
                    current = sortedHeadings[i].id;
                }
            }
            setCurrentSection(current);
        }
  
        window.addEventListener('scroll', onScroll, {
            capture: true,
            passive: true,
        });
    
        onScroll();
    }, [tableOfContents]);

    // detect a url change
    useEffect(() => {
        setCurrentSection(tableOfContents[0]?.slug);
    }, [router.asPath, tableOfContents]);
  
    return currentSection;
}

/**
 * Get a list of headings from a table of contents list.
 * @param tableOfContents A table of contents list.
 * @returns A heading list.
 */
function getHeadingList(tableOfContents: TableOfContentsItem[]) {
    let headingList: Heading[] = [];

    tableOfContents.forEach(element => {
        // add each id to our heading list
        headingList.push({
            id: element.slug,
            top: getTop(element.slug)
        });

        // loop through our sub arrays and add them to the list as well
        element.children.forEach(child => {
                // add each id to our heading list
            headingList.push({
                id: child.slug,
                top: getTop(child.slug)
            });
        });
    });

    return headingList;
}

/**
 * Get the top position of an element from its id.
 * @param id An html id selector.
 * @returns An elements position.
 */
function getTop(id: string) {
    if(document.getElementById(id)){
        return document.getElementById(id)!.getBoundingClientRect().top + window.scrollY;
    }

    return 0;
}