interface Props {
    /**
     * Custom css classnames to be applied to the icon
     */
    className?: string;
    /**
     * Is the icon active?
     */
    selected?: boolean;
};

/**
 * A PC SVG icon.
 * @returns A PC SVG icon.
 */
const PCIcon = ({
    className = "w-6 h-6",
    selected = false
}: Props) => {
    return(
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <path
                d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
                strokeWidth="2"
                strokeLinejoin="round"
                className={
                    selected ? 'stroke-primary-500 fill-primary-400/20' : 'stroke-slate-400 dark:stroke-slate-500'
                }
            />
            <path
                d="M14 15c0 3 2 5 2 5H8s2-2 2-5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={
                    selected ? 'stroke-primary-500' : 'stroke-slate-400 dark:stroke-slate-500'
                }
            />
        </svg>
    );
};

export default PCIcon;