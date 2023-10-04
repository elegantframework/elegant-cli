import { CMSContext } from '@/utils/Context';
import Link from 'next/link';
import { useContext } from 'react';
import { GitHubIcon } from "@brandonowens/elegant-ui";

interface Props {
  /**
   * Is the sidebar open?
   */
  isOpen: boolean;
};

/**
 * The admin sidebar.
 * @returns An html sidebar to be used within the admin area of the cms.
 */
export default function Sidebar({ isOpen = false }: Props) {
  const { collections } = useContext(CMSContext);

  return (
    <aside
      className={`absolute top-[53px] z-20 h-full w-full md:relative md:-top-[6px] md:block md:w-64 md:min-w-[16rem]${
        isOpen ? 'block' : 'hidden'
      }`}
      aria-label="Sidebar"
    >
      <div className="py-4 px-3 h-full max-h-[calc(100vh-96px)] overflow-y-scroll scrollbar-hide bg-gray-50 ">
        <ul className="space-y-2">
          <li>
            <Link href="/admin">
              <div className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 cursor-pointer">
                <svg
                  className="h-6 w-6 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M13 21V11h8v10h-8zM3 13V3h8v10H3zm6-2V5H5v6h4zM3 21v-6h8v6H3zm2-2h4v-2H5v2zm10 0h4v-6h-4v6zM13 3h8v6h-8V3zm2 2v2h4V5h-4z"
                  />
                </svg>
                <span className="ml-3">Collections</span>
              </div>
            </Link>
          </li>
          <>
            {collections.map((collection) => (
              <li key={collection}>
                <Link href={`/admin/${collection}`}>
                  <div className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 cursor-pointer">
                    <svg
                      className="h-6 w-6 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <span className="ml-3 capitalize">{collection}</span>
                  </div>
                </Link>
              </li>
            ))}
          </>
          <li>
            <Link href="/admin/settings">
              <div className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 cursor-pointer">
                <svg
                  className="h-6 w-6 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                <span className="ml-3 flex-1 whitespace-nowrap">Settings</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="h-10 bg-gray-50 py-2 px-4 border-t text-xs flex justify-between items-center w-full">
        <a
          className="font-semibold text-gray-500 hover:underline hover:text-gray-900"
          href="hhttps://www.elegantframework.com/docs/installation"
          target="_blank"
        >
          Documentation
        </a>
        <div className="gap-4 flex">
          <a
            href="https://github.com/elegantframework/elegant-cli"
            className="ml-6 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
            target="_blank"
          >
              <span className="sr-only">
                  Elegant Framework on GitHub
              </span>
              <GitHubIcon className="w-5 h-5 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"/>
          </a>
        </div>
      </div>
    </aside>
  );
};