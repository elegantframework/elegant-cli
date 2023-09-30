import clsx from "clsx";
import Link from "next/link";

interface Props {
    /**
     * The relative url for this navigation link.
     */
    href: string;
    /**
     * Is this url currently active?
     */
    isActive: boolean;
    /**
     * The label of this link.
     */
    label: string;
};

/**
 * A navigation item for the sidebar.
 * @returns An html link to be used within the sidebar component.
 */
export default function NavItem({
    href,
    isActive,
    label
}: Props) {
    return(
        <Link
            href={href}
            className={clsx('block border-l pl-4 -ml-px', {
                'text-primary-500 border-current font-semibold dark:text-primary-400': isActive,
                'border-transparent hover:border-slate-400 dark:hover:border-slate-500': !isActive
            })}
        >
            {label}
        </Link>
    );
};