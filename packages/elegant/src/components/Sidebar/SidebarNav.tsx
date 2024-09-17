'use client'
import { NavigationSection } from '../Types';
import { usePathname } from 'next/navigation';
import NavItem from './NavItem';
import { cn } from "@/utils/utils";

/**
 * The navigation menu to be used within the sidebar.
 * @returns An html ul navigation list.
 */
export default function SidebarNav({
    mobile = false,
    nav
}: {
    mobile?: boolean;
    nav: NavigationSection[];
}) {    

    const pathname = usePathname();

    return(
        <nav className="lg:text-sm lg:leading-6 relative">
            <div className="sticky top-0 -ml-0.5 pointer-events-none">
                {!mobile && <div className="h-10 bg-white dark:bg-slate-900" />}
                <div className="bg-white dark:bg-slate-900 relative pointer-events-auto">
                    
                </div>
                {!mobile && <div className="h-8 bg-gradient-to-b from-white dark:from-slate-900" />}
            </div>
            <ul>
                {nav.map((section) => (
                    <li key={section.title} className="mt-12 lg:mt-8">
                        <h5 className="mb-8 lg:mb-3 font-semibold text-slate-900 dark:text-slate-200">
                            {section.title}
                        </h5>
                        <ul className={cn(
                            'space-y-6 lg:space-y-2 border-l border-slate-100',
                            mobile ? 'dark:border-slate-700' : 'dark:border-slate-800'
                        )}>
                            {section.links.map((item) => (
                                <li key={item.title}>
                                    <NavItem 
                                        href={item.href}
                                        isActive={item.href === pathname.split('#')[0].split('?')[0]}
                                        label={item.title}
                                    />
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </nav>
    );
};