import React from "react";
import clsx from 'clsx';

interface Props {
    /**
     * The url css text color classes.
     */
    linkColor?: string;
};

/**
 * The Powered by Elegant mark to be used in footers.
 * @returns An html element to be used in Elegant footers.
 */
export default function PoweredByElegant({
    linkColor="hover:text-rose-500 dark:hover:text-rose-400"
}: Props) {
    return(
        <div className="border-t border-zinc-100 pb-8 pt-8 dark:border-zinc-700/40">
            <div className="flex flex-row items-center justify-center text-sm font-regular text-zinc-800 dark:text-zinc-200">
            Powered by 
            <a 
                target="_blank" 
                rel="noreferrer"
                href="http://elegantframework.com/" 
                aria-label="Powered by the Elegant framework"
                className={
                    clsx(
                        "font-semibold hover:text-rose-500 dark:hover:text-rose-400 pl-1",
                        linkColor
                    )
                }
            >
                Elegant
            </a>
                .
            </div>
        </div>
    );
}