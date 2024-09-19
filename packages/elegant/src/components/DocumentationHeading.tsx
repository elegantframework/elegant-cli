'use client'

import { NavigationSection } from "./Types";
import { usePathname } from 'next/navigation';

export default function DocumentationHeading({
    title,
    nav
}: {
    title: string;
    nav: NavigationSection[]; 
}){
    const pathname = usePathname();
    let section = "";
    
    nav.forEach(block => {
        block.links.forEach(
            item => {
                if(item.href === pathname.split('#')[0]) {
                    section = block.title;
                }
            }
        );
    });

    return(
        <div className="relative z-20">
            <div>
                    <p className="mb-2 text-sm leading-6 font-semibold text-primary-500 dark:text-primary-400">
                        {section}
                    </p>
                <div className="flex items-center">
                    <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
                        {title}
                    </h1>
                </div>
            </div>
        </div>
    );
}