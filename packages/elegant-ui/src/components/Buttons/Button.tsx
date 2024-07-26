import clsx from "clsx";
import React from "react";
import Link from 'next/link';

export interface ButtonProps {
    /**
     * The text to be displayed on the button.
     */
    text: string;
    /**
     * The variant type of button.
     */
    variant?: string;
    /**
     * Custom CSS classes to be applied to the button.
     */
    className?: string;
    /**
     * Provide a url to make this button a Link.
     */
    href?: string;
    /**
     * The primary css color class string.
     */
    primary?: string;
    /**
     * The secondary css color class string.
     */
    secondary?: string;
};

/**
 * A simple button.
 * @returns A pre styled button.
 */
export default function Button({
    text,
    variant="primary",
    className,
    href,
    primary="bg-indigo-800 font-semibold text-indigo-100 hover:bg-indigo-700 active:bg-indigo-800 active:text-indigo-100/70 dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:active:bg-indigo-700 dark:active:text-indigo-100/70",
    secondary="bg-indigo-50 font-medium text-indigo-900 hover:bg-indigo-100 active:bg-indigo-100 active:text-indigo-900/60 dark:bg-indigo-800/50 dark:text-indigo-300 dark:hover:bg-indigo-800 dark:hover:text-indigo-50 dark:active:bg-indigo-800/50 dark:active:text-indigo-50/70",
    ...props
}:ButtonProps) {
    let color = primary;

    if(variant === "secondary") {
        color = secondary;
    }
    
    className = clsx(
        'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
        color,
        className
    );

    if(href) {
        return(
            <Link href={href} className={className} {...props}>
                {text}
            </Link>
        );
    }

    return(
        <button className={className} {...props}>
            {text}
        </button>
    );
}