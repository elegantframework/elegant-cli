import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CMSSignOut } from '@/utils/Auth/hooks';
import docs_light from "@/img/beams/docs-light.png";
import docs_dark from "@/img/beams/docs-dark@tinypng.png";
import clsx from 'clsx';
import Config from '@/utils/Config/Config';
import Logo from '@/components/Logos/Logo/Logo';
import ThemeToggle from '../../Toggles/ThemeToggle/ThemeToggle';

type Props = {
    /**
     * The admin users name.
     */
    name?: string;
    /**
     * The admin users email address.
     */
    email?: string;
    /**
     * The admin users image.
     */
    image?: string;
    /**
     * The admin users status.
     */
    status?: 'authenticated' | 'unauthenticated' | 'loading';
    toggleSidebar: () => void;
    /**
     * Display the background "Beams" image?
     */
    beams?: boolean;
    /**
     * Does this admin header have navigation?
     */
    hasNav?: boolean;
}

/**
 * The admin header to be used within the CMS admin panel.
 * @returns An html admin header element.
 */
export default function AdminHeader({
    name = "",
    email = "",
    image = "",
    status = "unauthenticated",
    toggleSidebar,
    beams = true,
    hasNav = false
}: Props) {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpaque, setIsOpaque] = useState(false);

    useEffect(() => {
        let offset = 50
        function onScroll() {
          if (!isOpaque && window.scrollY > offset) {
            setIsOpaque(true);
          } 
          else if (isOpaque && window.scrollY <= offset) {
            setIsOpaque(false);
          }
        }
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
          window.removeEventListener('scroll', onScroll);
        }
      }, [isOpaque]);

    return <>
        <header
            className={clsx(
            'sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06]',
            isOpaque
                ? 'bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75'
                : 'bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent'
            )}
        >
            <div className="px-4 sm:px-6 md:px-8">
                {beams && 
                    <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
                        <div className="w-[108rem] flex-none flex justify-end">
                            <picture>
                                <img
                                    src={docs_light.src}
                                    alt=""
                                    className="w-[71.75rem] flex-none max-w-none opacity-90 dark:hidden"
                                    decoding="async"
                                />
                            </picture>
                            <picture>
                                <img
                                    src={docs_dark.src}
                                    alt=""
                                    className="w-[90rem] flex-none max-w-none opacity-90 hidden dark:block"
                                    decoding="async"
                                />
                            </picture>
                        </div>
                    </div>
                }
            </div>
            <div className="mx-auto">
                <div
                    className={clsx(
                        'py-4 border-b border-slate-900/10 lg:border-0 dark:border-slate-300/10',
                        hasNav ? 'mx-4 lg:mx-0' : 'px-6'
                    )}
                >
                    <div className="relative flex flex-wrap items-center justify-between">
                        <Link
                            href="/admin"
                            className="mr-3 flex-none w-[2.0625rem] overflow-hidden"
                        >
                            <Logo className="w-auto h-7"/>
                        </Link>
                        {status === 'loading' || (
                            <div className="flex items-center md:order-2">
                                <button
                                    type="button"
                                    className="mr-3 flex items-center rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    data-dropdown-toggle="dropdown"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={image || ''}
                                        alt="user"
                                    />
                                </button>
                                <div
                                    className={`right-0 top-[60px] z-50 my-4 w-full list-none divide-y divide-gray-100 rounded-br rounded-bl bg-white text-base shadow md:-right-0 md:top-[52px] md:w-auto ${
                                        isOpen ? 'block' : 'hidden'
                                    }`}
                                    id="dropdown"
                                    style={{
                                        position: 'absolute',
                                        margin: '0px'
                                    }}
                                >
                                    <div className="py-3 px-4">
                                        <span className="block text-sm text-gray-900">{name}</span>
                                        <span className="block truncate text-sm font-medium text-gray-500">
                                        {email}
                                        </span>
                                    </div>
                                    <ul className="py-1" aria-labelledby="dropdown">
                                        <li>
                                        <a
                                            className="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => CMSSignOut()}
                                        >
                                            Sign out
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    </>;
}