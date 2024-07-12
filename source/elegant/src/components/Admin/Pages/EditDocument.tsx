import { Session } from "next-auth";
import DashboardLayout from "../DashboardLayout";
import { useEditor } from "@/hooks/useEditor";
import Editor from "@/components/Editor/Editor";
import DocumentSettings from "../DocumentSettings";
import { createContext, useContext, useState } from "react";
import { Document, FileType } from "@/components/Types";
import { DocumentContextType } from "@/components/Types";
import { deepReplace } from "@/utils/Document/deepReplace";

export default function EditDocument({
    session
}:{
    session: Session | null
}) {
    const { editor } = useEditor({});
    const loading = false;
    const [ hasChanges, setHasChanges ] = useState(false);
    const [ document, setDocument ] = useState({} as Document);
    const [ files, setFiles ] = useState<FileType[]>([]);

    const collection = "Hello World";

    const editDocument = (property: string, value: any) => {
        const newValue = deepReplace(document, property, value)
        setDocument(newValue);
    }

    return(
        <DocumentContext.Provider value={{ 
            collection,
            document,
            editor,
            editDocument,
            files,
            hasChanges,
            setFiles,
            setHasChanges
        }}>
            <DashboardLayout session={session}>
                {hasChanges && (
                    <div className="sticky top-0 z-40 flex justify-end h-16 shrink-0 items-center gap-x-6 border-b border-white/5 px-4 shadow-sm sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto justify-center sm:justify-between inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Saving
                                </>
                            ) : (
                                'Save'
                            )}
                        </button>
                    </div>
                )}
                {!hasChanges && (
                    <div className="sticky top-0 z-40 flex justify-end h-16 shrink-0 items-center gap-x-6 border-b border-white/5 px-4 shadow-sm sm:px-6 lg:px-8"></div>
                )}
                <div className="flex max-w-screen-xl flex-col space-y-12 p-5 md:p-8">
                    <div className="min-h-full prose prose-xl">
                        <div className="rounded-md w-full md:w-[calc(100%-256px)] px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                            <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                Title
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full border-0 p-0 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Your collection name title"
                            />
                        </div>
                        <div className="rounded-md w-full md:w-[calc(100%-256px)] px-3 pb-1.5 pt-2.5 mt-10 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                            <Editor editor={editor} id="content" />
                        </div>
                    </div>
                    <div>
                        <DocumentSettings />
                    </div>
                </div>
            </DashboardLayout>
        </DocumentContext.Provider>
    );
}

export const DocumentContext = createContext<DocumentContextType>(
    {} as DocumentContextType
);

function SearchHeader() {
    return(
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 px-4 shadow-sm sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-white xl:hidden" onClick={() => {}}>
                <span className="sr-only">Open sidebar</span>
                {/* <Bars3Icon className="h-5 w-5" aria-hidden="true" /> */}
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <form className="flex flex-1" action="#" method="GET">
                    <label htmlFor="search-field" className="sr-only">
                    Search
                    </label>
                    <div className="relative w-full">
                    {/* <MagnifyingGlassIcon
                        className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                        aria-hidden="true"
                    /> */}
                    <input
                        id="search-field"
                        className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                        placeholder="Search..."
                        type="search"
                        name="search"
                    />
                    </div>
                </form>
            </div>
        </div>
    );
}