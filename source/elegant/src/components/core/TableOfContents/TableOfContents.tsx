import { SidebarContext } from "@/layouts/SidebarLayout";
import { TableOfContentsItem } from "@/types/TableOfContentsItem";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";

interface Props {
    tableOfContents: TableOfContentsItem[];
    currentSection: string;
};

const TableOfContents = ({
    tableOfContents,
    currentSection
}: Props) => {
    let sidebarContext = useContext(SidebarContext)
    let isMainNav = Boolean(sidebarContext)
  
    function closeNav() {
      if (isMainNav) {
        sidebarContext.setNavIsOpen(false)
      }
    }
  
    function isActive(section: TableOfContentsItem) {
      if (section.slug === currentSection) {
        return true
      }
      if (!section.children) {
        return false
      }
      return section.children.findIndex(isActive) > -1
    }
  
    let pageHasSubsections = tableOfContents.some((section) => section.children.length > 0);
  
    return (
      <>
        <div className="px-8">
          <h5 className="text-slate-900 font-semibold mb-4 text-sm leading-6 dark:text-slate-100">
            On this page
          </h5>
          <ul className="text-slate-700 text-sm leading-6">
            {/* {tableOfContents.map((section) => (
              <Fragment key={section.slug}>
                <li>
                  <a
                    href={`#${section.slug}`}
                    onClick={closeNav}
                    className={clsx(
                      'block py-1',
                      pageHasSubsections ? 'font-medium' : '',
                      isActive(section)
                        ? 'font-medium text-primary-500 dark:text-primary-400'
                        : 'hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'
                    )}
                  >
                    {section.title}
                  </a>
                </li>
                {section.children.map((subsection) => (
                  <li className="ml-4" key={subsection.slug}>
                    <a
                      href={`#${subsection.slug}`}
                      onClick={closeNav}
                      className={clsx(
                        'group flex items-start py-1',
                        isActive(subsection)
                          ? 'text-primary-500 dark:text-primary-400'
                          : 'hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'
                      )}
                    >
                      <svg
                        width="3"
                        height="24"
                        viewBox="0 -9 3 24"
                        className="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-500"
                      >
                        <path
                          d="M0 0L3 3L0 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      {subsection.title}
                    </a>
                  </li>
                ))}
              </Fragment>
            ))} */}
          </ul>
        </div>
      </>
    );
};

export default TableOfContents;

// function getTop(id: string) {
//     return document.getElementById(id).getBoundingClientRect().top + window.scrollY
// }

// function useTableOfContents(tableOfContents) {
  
//     let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.slug)
//     let [headings, setHeadings] = useState([])
  
//     const registerHeading = useCallback((id: string) => {
//       setHeadings((headings) => [...headings.filter((h) => id !== h.id), { id, top: getTop(id) }])
//     }, [])
  
//     const unregisterHeading = useCallback((id: string) => {
//       setHeadings((headings) => headings.filter((h) => id !== h.id))
//     }, [])
  
//     useEffect(() => {
//       if (tableOfContents.length === 0 || headings.length === 0) return
  
//       function onScroll() {
//         let style = window.getComputedStyle(document.documentElement);
//         let scrollMt = parseFloat(style.getPropertyValue('--scroll-mt').match(/[\d.]+/)?.[0] ?? 0)
//         let fontSize = parseFloat(style.fontSize.match(/[\d.]+/)?.[0] ?? 16)
//         scrollMt = scrollMt * fontSize
  
//         let sortedHeadings = headings.concat([]).sort((a, b) => a.top - b.top)
//         let top = window.pageYOffset + scrollMt + 1
//         let current = sortedHeadings[0].id
//         for (let i = 0; i < sortedHeadings.length; i++) {
//           if (top >= sortedHeadings[i].top) {
//             current = sortedHeadings[i].id
//           }
//         }
//         setCurrentSection(current)
//       }
  
//       window.addEventListener('scroll', onScroll, {
//         capture: true,
//         passive: true,
//       })
  
//       onScroll()
  
//       let resizeObserver = new window.ResizeObserver(() => {
//         for (let heading of headings) {
//           heading.top = getTop(heading.id)
//         }
//       })
  
//       resizeObserver.observe(document.body)
//       return () => {
//         resizeObserver.disconnect()
//         window.removeEventListener('scroll', onScroll, {
//           capture: true,
//           passive: true,
//         })
//       }
//     }, [headings, tableOfContents])
  
//     return { currentSection, registerHeading, unregisterHeading }
//   }