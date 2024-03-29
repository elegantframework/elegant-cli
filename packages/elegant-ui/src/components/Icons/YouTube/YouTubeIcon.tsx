import React from "react";

interface Props {
    /**
     * Custom css classnames to be applied to the icon
     */
    className?: string;
};

/**
 * A YouTube SVG Icon
 * @returns An YouTube svg icon.
 */
export default function YouTubeIcon({
    className = "w-5 h-5"
}: Props) {
    return(
        <svg 
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M19.0155 4H4.98449C2.23163 4 0 6.23163 0 8.98449V15.9985C0 18.7514 2.23163 20.983 4.98449 20.983H19.0155C21.7684 20.983 24 18.7514 24 15.9985V8.98449C24 6.23163 21.7684 4 19.0155 4ZM15.6445 12.8328L9.08177 15.9628C8.9069 16.0462 8.7049 15.9187 8.7049 15.725V9.26926C8.7049 9.07279 8.91221 8.94545 9.08744 9.03426L15.6502 12.3599C15.8453 12.4588 15.8419 12.7386 15.6445 12.8328Z" />
        </svg>
    );
};