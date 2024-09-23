'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { GitHubIcon, VersionSelector } from '@brandonowens/elegant-ui';
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import ThemeSelector from "./ThemeSelector";
import { cn } from "@/utils/utils";
import { NavigationSection } from "./Types";

export default function Header({
  hasNav = false,
  nav = [],
  title = "",
  isOpaque = false,
  onNavToggle,
  beams = true
}:{
  hasNav?: boolean;
  nav?: NavigationSection[];
  title?: string;
  isOpaque?: boolean;
  onNavToggle?: () => void;
  beams?: boolean;
}) {
  const pathname = usePathname(); 
  let section = "";

  if(hasNav && nav.length > 0) {
    nav.forEach(block => {
      block.links.forEach(
          item => {
              if(item.href === pathname.split('#')[0]) {
                  section = block.title;
              }
          }
      );
    });
  }

  return(
    <>
      {beams && (
        <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
          <div className="w-[108rem] flex-none flex justify-end">
            <picture>
              <source srcSet={require('./../../public/beams/docs-light.avif').default.src} type="image/avif" />
              <img
                src={require('./../../public/beams/docs-light.png').default.src}
                alt=""
                className="w-[71.75rem] flex-none max-w-none dark:hidden"
                decoding="async"
              />
            </picture>
            <picture>
              <source
                srcSet={require('./../../public/beams/docs-dark@30.avif').default.src}
                type="image/avif"
              />
              <img
                src={require('./../../public/beams/docs-dark@tinypng.png').default.src}
                alt=""
                className="w-[90rem] flex-none max-w-none hidden dark:block"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      )}
      <div
        className={cn(
          'sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06]',
          isOpaque
            ? 'bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75'
            : 'bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent'
        )}
      >
        <div className="max-w-8xl mx-auto">
            <div className={cn(
                'py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10',
                    hasNav ? 'mx-4 lg:mx-0' : 'px-4'
                )}
            >
            <div className="relative flex items-center">
              <Link
                href="/"
                className="mr-3 flex-none w-auto overflow-hidden md:w-auto"
              >
                <Logo 
                  className="w-auto h-7" 
                  title={process.env.NEXT_PUBLIC_APP_NAME || `Elegant` + ` logo`}
                />
              </Link>
              {/* <VersionSelector
                version='3.x'
                pastVersions={[
                    {label: "2.x", href: "https://www.v2.elegantframework.com/"},
                    {label: "1.x", href: "https://www.v1.elegantframework.com/"}
                ]}
              /> */}
              <div className="relative hidden md:flex items-center ml-auto">
                <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                  <ul className="flex space-x-8">
                    <Suspense>
                      <NavItems />
                    </Suspense>
                  </ul>
                </nav>
                <div className="flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800">
                  <ThemeToggle />
                  {process.env.NEXT_PUBLIC_APP_REPOSITORY && (
                    <a
                      href={process.env.NEXT_PUBLIC_APP_REPOSITORY || ""}
                      className="ml-6 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">{process.env.NEXT_PUBLIC_APP_NAME || "Elegant"} on GitHub</span>
                      <GitHubIcon className="w-5 h-5 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"/>
                    </a>
                  )}
                </div>
              </div>
              <Suspense>
                <NavPopover className="ml-auto -my-1" display="md:hidden" />
              </Suspense>
            </div>
          </div>
          {hasNav && (
            <div className="flex items-center p-4 border-b border-slate-900/10 md:hidden dark:border-slate-50/[0.06]">
              <button
                type="button"
                onClick={() => {
                  onNavToggle && (onNavToggle())
                }}
                className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
              >
                <span className="sr-only">Navigation</span>
                <svg width="24" height="24">
                  <path
                    d="M5 6h14M5 12h14M5 18h14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              {title && (
                <ol className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0">
                  {section && (
                    <li className="flex items-center">
                      {section}
                      <svg
                        width="3"
                        height="6"
                        aria-hidden="true"
                        className="mx-3 overflow-visible text-slate-400"
                      >
                        <path
                          d="M0 0L3 3L0 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </li>
                  )}
                  <li className="font-semibold text-slate-900 truncate dark:text-slate-200">
                    {title}
                  </li>
                </ol>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  ); 
}

export function NavItems() {
  const pathname = usePathname();

  return <>
    <li>
      <Link
        href="/docs"
        className={
            cn(
              'hover:text-primary-500 dark:hover:text-primary-400', 
              (pathname.indexOf('/docs/') > -1 ? 'text-primary-500 dark:text-primary-400' : '')
            )
      }>
        Docs
      </Link>
    </li>
    <li>
      <Link
        href="/blog"
        className={
            cn(
              'hover:text-primary-500 dark:hover:text-primary-400', 
              (pathname.indexOf('/blog') > -1 ? 'text-primary-500 dark:text-primary-400' : '')
            )
          }>
          Blog
      </Link>
    </li>
  </>;
}

export function NavPopover({ display = 'md:hidden', className = "", ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(className, display)} {...props}>
      <button
        type="button"
        className="text-slate-500 w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
        onClick={() => setIsOpen(true)}
      >
        <span className="sr-only">Navigation</span>
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
        className={cn('fixed z-50 inset-0', display)}
        open={isOpen}
        onClose={setIsOpen}
      >
        <DialogPanel className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80">
          <DialogTitle className="hidden">Switch Theme</DialogTitle>
          <div className="fixed top-4 right-4 w-full max-w-xs bg-white rounded-lg shadow-lg p-6 text-base font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:highlight-white/5">
            <button
              type="button"
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close navigation</span>
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
              <NavItems />
              {process.env.NEXT_PUBLIC_APP_REPOSITORY && (
                <li>
                  <a
                    href={process.env.NEXT_PUBLIC_APP_REPOSITORY || ""}
                    className="hover:text-primary-500 dark:hover:text-primary-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-200/10">
              <ThemeSelector />
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  )
}