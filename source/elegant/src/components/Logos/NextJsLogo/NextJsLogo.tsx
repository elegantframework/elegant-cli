import clsx from "clsx";

interface Props {
    /**
     * CSS class names to be applied to the logo
     */
    className?: string;
};

/**
 * @returns An SVG Next.js logo
 */
const NextJsLogo = ({
    className = "w-auto h-8",
    ...props
}: Props) => {
    return(      
        <svg 
            viewBox="0 0 25 25" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={clsx('text-slate-400 stroke-current', className)}
            {...props}
        >
            <path d="M24 12.25C24 18.7389 18.7389 24 12.25 24C5.76114 24 0.5 18.7389 0.5 12.25C0.5 5.76114 5.76114 0.5 12.25 0.5C18.7389 0.5 24 5.76114 24 12.25Z" stroke="currentColor"/>
            <path d="M8 16V8L18 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.25 8C17.25 7.80109 17.171 7.61032 17.0303 7.46967C16.8897 7.32902 16.6989 7.25 16.5 7.25C16.3011 7.25 16.1103 7.32902 15.9697 7.46967C15.829 7.61032 15.75 7.80109 15.75 8V16.17L17.25 17.81V8Z" fill="currentColor"/>
            <defs>
            <linearGradient id="paint0_linear_22_8" x1="10.551" y1="13.2632" x2="18.2315" y2="20.7085" gradientUnits="userSpaceOnUse">
            <stop offset="0.24"/>
            <stop offset="1" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint1_linear_22_8" x1="16.5" y1="7.25" x2="16.5" y2="14.25" gradientUnits="userSpaceOnUse">
            <stop/>
            <stop offset="1" stopOpacity="0"/>
            </linearGradient>
            </defs>
        </svg>
    );
};

export default NextJsLogo;