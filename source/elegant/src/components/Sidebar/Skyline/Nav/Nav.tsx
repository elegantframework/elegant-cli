import { useRouter } from 'next/router';
import { NavigationSection } from '@/types/Navigation';
import clsx from 'clsx';
import NavItem from '../NavItem/NavItem';

interface Props {
    /**
     * Is this view for a mobile device?
     */
    mobile?: boolean;
    /**
     * The navigation list.
     */
    nav: NavigationSection[];
};

/**
 * The navigation menu to be used within the sidebar.
 * @returns An html ul navigation list.
 */
export default function Nav({
    mobile = false,
    nav
}: Props) {
    const router = useRouter();
    
    return(
        <nav className="lg:text-sm lg:leading-6 relative">
            <div className="sticky top-0 -ml-0.5 pointer-events-none">
                {!mobile && <div className="h-10 bg-white dark:bg-slate-900" />}
                <div className="bg-white dark:bg-slate-900 relative pointer-events-auto">
                    {/* <SearchButton className="hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700">
                    {({ actionKey }) => (
                        <>
                        <svg
                            width="24"
                            height="24"
                            fill="none"
                            aria-hidden="true"
                            className="mr-3 flex-none"
                        >
                            <path
                            d="m19 19-3.5-3.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            />
                            <circle
                            cx="11"
                            cy="11"
                            r="6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            />
                        </svg>
                        Quick search...
                        {actionKey && (
                            <span className="ml-auto pl-3 flex-none text-xs font-semibold">
                            {actionKey[0]}K
                            </span>
                        )}
                        </>
                    )}
                    </SearchButton> */}
                </div>
                {!mobile && <div className="h-8 bg-gradient-to-b from-white dark:from-slate-900" />}
            </div>
            <ul>
                {nav.map((section) => (
                    <li key={section.title} className="mt-12 lg:mt-8">
                        <h5 className="mb-8 lg:mb-3 font-semibold text-slate-900 dark:text-slate-200">
                            {section.title}
                        </h5>
                        <ul className={clsx(
                            'space-y-6 lg:space-y-2 border-l border-slate-100',
                            mobile ? 'dark:border-slate-700' : 'dark:border-slate-800'
                        )}>
                            {section.links.map((item) => (
                                <li key={item.title}>
                                    <NavItem 
                                        href={item.href}
                                        isActive={item.href === router.asPath.split('#')[0].split('?')[0]}
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