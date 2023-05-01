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
const MDXLogo = ({
    className = "w-auto h-8",
    ...props
}: Props) => {
    return(      
        <svg 
            viewBox="0 0 48 20"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={clsx('text-slate-400 stroke-current', className)}
            {...props}
        >
            <path d="M5.64551 15.0527V6.50008L10.3495 11.204L15.1389 6.41455V14.9672" stroke="currentColor" strokeWidth="2.05263"/>
            <path d="M24.1196 13.6843V3.67773" stroke="currentColor" strokeWidth="2.05263"/>
            <path d="M19.5015 9.32239L24.1199 13.9408L28.7383 9.32239" stroke="currentColor" strokeWidth="2.05263"/>
            <path d="M41.9089 14.1085L31.9023 4.10535M31.9879 14.1119L41.9944 4.10535" stroke="currentColor" strokeWidth="2.05263"/>
        </svg>
    );
};

export default MDXLogo;