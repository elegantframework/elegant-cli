import clsx from "clsx";
import Link from "next/link";
import { BuiltWithElegant } from "@brandonowens/elegant-ui";
import Config from '@/utils/Config/Config';
import { NavigationLink } from "@/types/Navigation";

interface Props {
    /**
     * A url link to the previous page.
     */
    previous?: NavigationLink;
    /**
     * A url link to the next page.
     */
    next?: NavigationLink;
    /**
     * Child html to be displayed inside the footer.
     */
    children: React.ReactNode;
};

/**
 * The footer to be used below documentation pages.
 * @returns An html footer element.
 */
const DocsFooter = ({
    previous,
    next,
    children
}: Props) => {
    return (
        <footer className={clsx('text-sm leading-6', previous || next ? 'mt-12' : 'mt-16')}>
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
            <div className="py-8 border-y border-slate-200 sm:flex justify-between text-slate-500 dark:border-slate-200/5">
                <BuiltWithElegant 
                    copyright="Elegant, Inc."
                />
                {children ? (children) : (
                <div className="flex space-x-10 text-slate-400 dark:text-slate-500">
                    <a
                    href={Config('app.repository')}
                    className="hover:text-slate-500 dark:hover:text-slate-400"
                    >
                    <span className="sr-only">GitHub</span>
                    <svg width="25" height="24" fill="currentColor">
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.846 0c-6.63 0-12 5.506-12 12.303 0 5.445 3.435 10.043 8.205 11.674.6.107.825-.262.825-.585 0-.292-.015-1.261-.015-2.291-3.015.569-3.795-.754-4.035-1.446-.135-.354-.72-1.446-1.23-1.738-.42-.23-1.02-.8-.015-.815.945-.015 1.62.892 1.845 1.261 1.08 1.86 2.805 1.338 3.495 1.015.105-.8.42-1.338.765-1.645-2.67-.308-5.46-1.37-5.46-6.075 0-1.338.465-2.446 1.23-3.307-.12-.308-.54-1.569.12-3.26 0 0 1.005-.323 3.3 1.26.96-.276 1.98-.415 3-.415s2.04.139 3 .416c2.295-1.6 3.3-1.261 3.3-1.261.66 1.691.24 2.952.12 3.26.765.861 1.23 1.953 1.23 3.307 0 4.721-2.805 5.767-5.475 6.075.435.384.81 1.122.81 2.276 0 1.645-.015 2.968-.015 3.383 0 .323.225.707.825.585a12.047 12.047 0 0 0 5.919-4.489 12.537 12.537 0 0 0 2.256-7.184c0-6.798-5.37-12.304-12-12.304Z"
                        />
                    </svg>
                    </a>
                </div>
                )}
            </div>
        </footer>
    );
};

export default DocsFooter;