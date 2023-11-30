import React from 'react';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';

interface Props {
    /**
     * The current version.
     */
    version: string;
    /**
     * Past versions to be displayed in the dropdown.
     */
    pastVersions: Link[];
    /**
     * css classes to be applied to the link to give it color.
     */
    linkColor?: string;
    /**
     * Custom css classnames to be applied to the icon
     */
    className?: string;
};

/**
 * A version selector component to be used within headers.
 * @returns A selector component with dropdown options.
 */
export default function VersionSelector({
    version,
    pastVersions,
    linkColor="text-indigo-500 dark:text-indigo-400",
    className
}: Props) {
  return (
    <Menu as="div" className={clsx("relative z-50", className)}>
        <Menu.Button className="text-xs leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:highlight-white/5">
            v{version}
            <svg width="6" height="3" className="ml-2 overflow-visible" aria-hidden="true">
            <path
                d="M0 0L3 3L6 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            </svg>
        </Menu.Button>      
      <Menu.Items className="absolute top-full mt-1 py-2 w-40 rounded-lg bg-white shadow ring-1 ring-slate-900/5 text-sm leading-6 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:highlight-white/5">
        <Menu.Item disabled>
          <span className={clsx("flex items-center justify-between px-3 py-1", linkColor)}>
            v{version}
            <svg width="24" height="24" fill="none" aria-hidden="true">
              <path
                d="m7.75 12.75 2.25 2.5 6.25-6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Menu.Item>
        {pastVersions.map(
          (version: Link) => (
            <Menu.Item key={version.href}>
              {({ active }) => (
                <a
                  href={version.href}
                  className={clsx(
                    'block px-3 py-1',
                    active && 'bg-slate-50 text-slate-900 dark:bg-slate-600/30 dark:text-white'
                  )}
                >
                  v{version.label}
                </a>
              )}
            </Menu.Item>
          )
        )}
      </Menu.Items>
    </Menu>
  )
}

/**
 * A url link type.
 */
interface Link {
  /**
   * The urls label to be displayed to users.
   */
  label: string;
  /**
   * The actual url link.
   */
  href: string;
};