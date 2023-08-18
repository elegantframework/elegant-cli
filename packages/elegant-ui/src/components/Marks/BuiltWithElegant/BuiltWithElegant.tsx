import React from "react";
import clsx from 'clsx';

export interface Props {
    /**
     * The url css text color classes.
     */
    linkColor?: string;
    /**
     * A copyright company name to be included in the footer.
     */
    copyright?: string;
};

/**
 * The Built with Elegant mark to be used in footers.
 * @returns An html element to be used in Elegant footers.
 */
const BuiltWithElegant = ({
    linkColor="hover:text-primary-500 dark:hover:text-primary-400",
    copyright="Elegant, Inc."
}: Props) => {
    return(
        <div className="mb-6 sm:mb-0 sm:flex">
            <p>Copyright &copy; {new Date().getFullYear()} {copyright}</p>
            <p className="sm:ml-4 sm:pl-4 sm:border-l sm:border-slate-200 dark:sm:border-slate-200/5">
                Built with <a href='http://elegantframework.com/' 
                                aria-label='Built with the Elegant framework'
                                className={clsx('font-semibold', linkColor)}
                            >
                                Elegant
                            </a>.
            </p>
        </div>
    );
}

export default BuiltWithElegant;