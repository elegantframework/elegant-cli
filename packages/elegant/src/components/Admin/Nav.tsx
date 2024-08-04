"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  Menu,
  Newspaper,
  Settings,
  FileCode,
  Github,
  WalletCards,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { ElegantLogo } from "@brandonowens/elegant-ui";
import { Collection, NavigationItem } from "../Types";

const externalLinks = [
  {
    name: "Star on GitHub",
    href: "https://github.com/elegantframework/elegant-cli",
    icon: <Github width={18} />,
  },
  {
    name: "Documentation",
    href: "https://www.elegantframework.com/docs/installation",
    icon: <FileCode width={18} />,
  },
];

export default function Nav({
  children,
  collections
}: {
  children: ReactNode,
  collections: Collection[]
}) {
  const segments = useSelectedLayoutSegments();
  const pathname = usePathname();
  const { id } = useParams() as { id?: string };

  const tabs = useMemo(() => {
    const navigation: NavigationItem[] = [];

    navigation.push({
      name: "Overview",
      href: "/admin",
      isActive: pathname === "/admin",
      icon: <LayoutDashboard width={18} />,
    });

    if(collections) {
      collections.forEach(collection => {
        navigation.push({
          name: collection.title,
          href: `/admin/${collection.title}`,
          isActive: pathname.includes(`/admin/${collection.title}`),
          icon: <Newspaper width={18} />,
        });
      });
    }

    navigation.push(
      {
        name: "Collections",
        href: `/admin/collections`,
        isActive: pathname.includes("collections"),
        icon: <WalletCards width={18} />,
      },
      {
        name: "Settings",
        href: "/admin/settings",
        isActive: pathname === "/admin/settings",
        icon: <Settings width={18} />,
      },
    );

    return(
      navigation
    );
  }, [segments, id, pathname, collections]);

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <button
        className={`fixed z-20 ${
          // left align for Editor, right align for other pages
          segments[0] === "post" && segments.length === 2 && !showSidebar
            ? "left-5 top-5"
            : "right-5 top-7"
        } sm:hidden`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>
      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all dark:border-stone-700 dark:bg-stone-900 sm:w-60 sm:translate-x-0`}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
            <Link
                href="/admin"
                className="mr-3 flex-none w-[2.0625rem] overflow-hidden"
            >
                <ElegantLogo className="w-auto h-7"/>
            </Link>
          </div>
          <div className="grid gap-1 mt-1">
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
              >
                {icon}
                <span className="text-sm font-medium capitalize">{name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="grid gap-1">
            {externalLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <p>↗</p>
              </a>
            ))}
          </div>
          <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
          {children}
        </div>
      </div>
    </>
  );
}