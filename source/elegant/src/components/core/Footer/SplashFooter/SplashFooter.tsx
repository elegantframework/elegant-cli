import { NavigationLink, NavigationSection } from "@/types/Navigation";
import Link from "next/link";
import Logo from "./../../Logos/Logo/Logo";

interface Props {
    /**
     * A navigation object containing url links and titles
     */
    navigation: NavigationSection[];
};

/**
 * A footer for splash pages such as the home page
 * @returns An html footer with a number of navigation links
 */
const SplashFooter = ({navigation}: Props) => {

    let sections = [];

    for(let i = 0; i < navigation.length; i++)
    {
        sections.push(
            renderNavigationSection(navigation[i])
        );
    };
    
    return(
        <footer className="pb-16 text-sm leading-6">
            <div className="max-w-7xl mx-auto divide-y divide-slate-200 px-4 sm:px-6 md:px-8 dark:divide-slate-700">
                <div className="flex">
                    <div className="flex-none w-1/2 space-y-10 sm:space-y-8 lg:flex lg:space-y-0">
                        {sections}
                    </div>
                </div>
                <div className="mt-16 pt-10">
                    <Logo className="w-auto h-8" />
                </div>
            </div>
        </footer>
    );
};

export default SplashFooter;

/**
 * Render a footer navigation list of navigation items.
 * @param section A list of navigation items.
 * @returns An html block of footer navigation links.
 */
const renderNavigationSection = (section: NavigationSection) => {
    
    let links = [];

    for(let i = 0; i < section.links.length; i++)
    {
        links.push(
            renderNavigationLink(section.links[i])
        );
    };
    
    return(
        <div 
            key={section.title} 
            className="lg:flex-none lg:w-1/2"
        >
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                {section.title}
            </h2>
            <ul className="mt-3 space-y-2">
                {links}
            </ul>
        </div>
    );
};

/**
 * Render a navigation link.
 * @param link A url link.
 * @returns A list item with a next.js url link.
 */
const renderNavigationLink = (link: NavigationLink) => {
    return (
        <li key={link.href}>
            <Link
                href={link.href}
                className="hover:text-slate-900 dark:hover:text-slate-300"
                target={link.external === true ? "_blank" : ""}
                rel={link.external === true ? "noopener noreferrer" : ""}
            >
                {link.title}
            </Link>
        </li>
    );
};