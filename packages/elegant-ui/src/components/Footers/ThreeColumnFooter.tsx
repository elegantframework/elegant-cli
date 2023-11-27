import React from "react";
import { NavigationLink, NavigationSection } from "../../types/Navigation";
import Link from "next/link";
import Logo from '../Logos/ElegantLogo/ElegantLogo';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import clsx from "clsx";

interface Props {
    /**
     * Column 1 of links.
     */
    navigation1: NavigationSection[];
    /**
     * Column 2 of links.
     */
    navigation2?: NavigationSection[];
    /**
     * Column 3 of links.
     */
    navigation3?: NavigationSection[];
    /**
     * The background css color classes.
     */
    background?: string;
    /**
     * A logo to be displayed in the footer.
     */
    logo?: React.ReactElement;
    /**
     * A copyright company name to be included in the footer.
     */
     copyright?: string;
};

/**
 * A footer with three columns of url links
 * @returns An html footer with three columns of navigation links.
 */
export default function ThreeColumnFooter({
    navigation1,
    navigation2=[],
    navigation3=[],
    background="bg-gray-900 dark:bg-white",
    logo=<Logo className="w-auto h-6 text-white dark:text-slate-900"/>,
    copyright=""
}: Props) {
    return(
        <footer className={clsx("pb-16 text-sm leading-6", background)}>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    <div className="ml-0 md:ml-16 md:max-w-min space-y-8 relative">
                        {logo}
                        <div className="flex space-x-6">
                            {/* {navigation.social.map((item) => (
                                <a key={item.name} href={item.href} className="text-gray-500 hover:text-gray-400">
                                <span className="sr-only">{item.name}</span>
                                <item.icon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            ))} */}
                        </div>
                        {copyright.length > 0 && (
                            <div className="text-white dark:text-slate-900 absolute -bottom-4 lg:bottom-2 left-0 xs:pt-4">
                                &copy; {new Date().getFullYear()} {copyright}
                            </div>
                        )}
                    </div>
                    <div className="mt-16 ml-0 md:ml-16 grid grid-cols-2 md:grid-cols-3 md:auto-columns-min gap-4 lg:col-span-2 lg:mt-0">
                         <div>
                            {navigation1.map((item, index) => (
                                <section className={clsx(
                                    index !== 0 ? "mt-8" : ""
                                )}>
                                    <h3 className="text-sm font-semibold leading-6 text-white dark:text-slate-900">
                                        {item.title}
                                    </h3>
                                    <ul role="list" className="mt-2 space-y-2">
                                        {item.links.map((link) => (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className="text-sm leading-6 text-slate-300 dark:text-slate-500 hover:text-white dark:hover:text-slate-700"
                                                    target={link.external === true ? "_blank" : ""}
                                                    rel={link.external === true ? "noopener noreferrer" : ""}
                                                >
                                                    <span className="mr-2">
                                                        {link.title}
                                                    </span>
                                                    {link.external === true && (
                                                        <ArrowTopRightOnSquareIcon 
                                                            className="w-4 h-4 inline-flex relative -top-[1px]"
                                                        />
                                                    )}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ))}
                        </div>
                         <div className="mt-0">
                            {navigation2.map((item, index) => (
                                <section className={clsx(
                                    index !== 0 ? "mt-8" : ""
                                )}>
                                    <h3 className="text-sm font-semibold leading-6 text-white dark:text-slate-900">
                                        {item.title}
                                    </h3>
                                    <ul role="list" className="mt-2 space-y-2">
                                        {item.links.map((link) => (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className="text-sm leading-6 text-slate-300 dark:text-slate-500 hover:text-white dark:hover:text-slate-700"
                                                    target={link.external === true ? "_blank" : ""}
                                                    rel={link.external === true ? "noopener noreferrer" : ""}
                                                >
                                                    <span className="mr-1">
                                                        {link.title}
                                                    </span>
                                                    {link.external === true && (
                                                        <ArrowTopRightOnSquareIcon 
                                                            className="w-4 h-4"
                                                        />
                                                    )}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ))}
                        </div>
                         <div className="mt-0">
                            {navigation3.map((item, index) => (
                                <section className={clsx(
                                    index !== 0 ? "mt-8" : ""
                                )}>
                                    <h3 className="text-sm font-semibold leading-6 text-white dark:text-slate-900">
                                        {item.title}
                                    </h3>
                                    <ul role="list" className="mt-2 space-y-2">
                                        {item.links.map((link) => (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className="text-sm leading-6 text-slate-300 dark:text-slate-500 hover:text-white dark:hover:text-slate-700"
                                                    target={link.external === true ? "_blank" : ""}
                                                    rel={link.external === true ? "noopener noreferrer" : ""}
                                                >
                                                    <span className="mr-1">
                                                        {link.title}
                                                    </span>
                                                    {link.external === true && (
                                                        <ArrowTopRightOnSquareIcon 
                                                            className="w-4 h-4"
                                                        />
                                                    )}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};