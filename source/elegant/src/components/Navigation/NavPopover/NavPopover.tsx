import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import NavItems from "../NavItems/NavItems";
import { ThemeSelect } from "../../Toggles/ThemeToggle/ThemeToggle";
import { NavigationItem } from "@/types/NavigationItem";
import Config from '@/utils/Config/Config';

interface Props {
    /**
     * CSS display classes
     */
    display?: string;
    /**
     * Custom css classes to be applied to the popover.
     */
    className?: string;
    /**
     * A list of navigation items for the header.
     */
    navigationItems?: NavigationItem[];
};

/**
 * A navigation pop over list with items for the header.
 * @returns A nav popover element to be used with the theme selector within the header.
 */
const NavPopover = ({
    display = "md:hidden'",
    className,
    navigationItems = [],
    ...props
}: Props) => {
    let [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // close the popover route change
        if (!isOpen){
            return;
        }
        function handleRouteChange() {
          setIsOpen(false);
        }

        Router.events.on('routeChangeComplete', handleRouteChange);
        
        return () => {
          Router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [isOpen]);

    return(
        <div className={clsx(className, display)} {...props}>
            <button
                type="button"
                className="text-slate-500 w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                onClick={() => setIsOpen(true)}
            >
                <span className="sr-only">
                    Navigation
                </span>
                <svg width="24" height="24" fill="none" aria-hidden="true">
                    <path
                        d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <Dialog
                as="div"
                className={clsx('fixed z-50 inset-0', display)}
                open={isOpen}
                onClose={setIsOpen}
            >
                <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80" />
                <div className="fixed top-4 right-4 w-full max-w-xs bg-white rounded-lg shadow-lg p-6 text-base font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:highlight-white/5">
                    <button
                        type="button"
                        className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="sr-only">
                            Close navigation
                        </span>
                        <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 overflow-visible" aria-hidden="true">
                            <path
                                d="M0 0L10 10M10 0L0 10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                    <ul className="space-y-6">
                        <NavItems 
                            navItems={navigationItems}
                        />
                        <li>
                            <a
                                href={Config('app.repository')}
                                className="hover:text-primary-500 dark:hover:text-primary-400"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-200/10">
                        <ThemeSelect />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default NavPopover;