'use client'
import Link from "next/link";
import { BuiltWithElegant } from "@brandonowens/elegant-ui";
import { NavigationSection } from "./Types";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";

interface Props {
    /**
     * The navigation list that is parsed over to determine the previous and next urls.
     */
    nav: NavigationSection[];
    /**
     * Child html to be displayed inside the footer.
     */
    children?: React.ReactNode;
};

/**
 * The footer to be used below documentation pages.
 * @returns An html footer element.
 */
export default function DocsFooter({
    nav,
    children
}: Props) {

    function usePrevNext() {
        const pathname = usePathname();
        const pages = nav.flatMap((section) => section.links);
        const pageIndex = pages.findIndex((page) => page.href === pathname.split('#')[0]);
        
        return {
          previous: pageIndex > -1 ? pages[pageIndex - 1] : undefined,
          next: pageIndex > -1 ? pages[pageIndex + 1] : undefined,
        }
    }
    
    const { previous, next } = usePrevNext();

    return (
        <footer className={cn('text-sm leading-6', previous || next ? 'mt-12' : 'mt-16')}>
            {(previous || next) && (
                <div className="mb-10 text-slate-700 font-semibold flex items-center dark:text-slate-200">
                    {previous && (
                        (<Link
                            href={previous.href}
                            className="group flex items-center hover:text-slate-900 dark:hover:text-white"
                        >
                            <>
                                <svg
                                    viewBox="0 0 3 6"
                                    className="mr-3 w-auto h-1.5 text-slate-400 overflow-visible group-hover:text-slate-600 dark:group-hover:text-slate-300"
                                >
                                    <path
                                        d="M3 0L0 3L3 6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                {previous.title}
                            </>
                        </Link>)
                    )}
                    {next && (
                        (<Link
                            href={next.href}
                            className="group ml-auto flex items-center hover:text-slate-900 dark:hover:text-white"
                        >
                            <>
                                {next.title}
                                <svg
                                    viewBox="0 0 3 6"
                                    className="ml-3 w-auto h-1.5 text-slate-400 overflow-visible group-hover:text-slate-600 dark:group-hover:text-slate-300"
                                >
                                    <path
                                        d="M0 0L3 3L0 6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </>
                        </Link>)
                    )}
                </div>
            )}
            <div className={
                cn(
                    "py-8 border-y border-slate-200 sm:flex text-slate-500 dark:border-slate-200/5",
                    children ? "justify-between" : "justify-center" 
                )
            }>
                <BuiltWithElegant 
                    copyright="Elegant, Inc."
                />
                {children ? (children) : (
                    <div className="flex space-x-10 text-slate-400 dark:text-slate-500">
                    
                    </div>
                )}
            </div>
        </footer>
    );
};