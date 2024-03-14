import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { CMSSignOut } from '@/utils/Auth/hooks';
import docs_light from "@/img/beams/docs-light.png";
import docs_dark from "@/img/beams/docs-dark@tinypng.png";
import clsx from 'clsx';
import { ElegantLogo } from '@brandonowens/elegant-ui';
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react';

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
    /**
     * Pass the method that toggles the sidebar open and closed.
     */
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
                            <ElegantLogo className="w-auto h-7"/>
                        </Link>
                        <div className="flex items-center md:order-2">
                            <Menu as="div" className="relative inline-block text-left z-22">
                                {({open}) => (
                                    <>
                                        <div>
                                            <Menu.Button 
                                                className={clsx(
                                                    "mr-3 flex items-center rounded-full bg-gray-800 text-sm md:mr-0",
                                                    open ? "ring-2 ring-gray-300 dark:ring-gray-600" : ""
                                                )}
                                            >
                                                <span className="sr-only">Open user settings menu</span>
                                                <Image 
                                                    className="h-8 w-8 rounded-full"
                                                    src={image}
                                                    alt="Profile Image"
                                                    height={32}
                                                    width={32}
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 mt-2 min-w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                <div className="px-1 py-1">
                                                    <Menu.Item>
                                                        <span className='text-gray-900 flex w-full items-center rounded-md px-2 py-2 text-sm'>
                                                            {name}
                                                        </span>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <span className='text-gray-500 flex w-full items-center rounded-md px-2 py-2 text-sm font-medium'>
                                                            {email}
                                                        </span>
                                                    </Menu.Item>
                                                </div>
                                                <div className="px-1 py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                        <Link 
                                                            href=""
                                                            className={
                                                                clsx(
                                                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm', 
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                )
                                                            }
                                                            onClick={() => CMSSignOut()}
                                                        >
                                                            Sign Out
                                                        </Link>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </>
                                )}
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </>;
}