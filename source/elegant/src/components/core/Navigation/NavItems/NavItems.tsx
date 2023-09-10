import { NavigationItem } from "@/types/NavigationItem";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
    /**
     * A list of navigation items
     */
    navItems: NavigationItem[];
};

/**
 * A list of navigation items for the header navigation element.
 * @returns A list of navigation items.
 */
const NavItems = ({navItems}: Props) => {
    const router = useRouter();

    let list: JSX.Element[] = [];

    // loop through our items, and add them to our list
    navItems.forEach(item => {
        list.push(
            <li key={item.label}>
                <Link
                    href={item.href}
                    className={
                        clsx(
                            'hover:text-primary-500 dark:hover:text-primary-400', 
                            (router.pathname.indexOf(item.path) > -1 ? 'text-primary-500 dark:text-primary-400' : '')
                        )
                    }
                >
                    {item.label}
                </Link>
            </li>
        ); 
    });

    return(<>{list}</>);
};

export default NavItems;