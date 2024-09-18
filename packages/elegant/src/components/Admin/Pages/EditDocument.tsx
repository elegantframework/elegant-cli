'use client'
import { Session } from "next-auth";
import DashboardLayout from "../DashboardLayout";
import { useEditor } from "@/utils/Hooks/useEditor";
import Editor from "@/components/Editor/Editor";
import DocumentSettings from "../DocumentSettings";
import { createContext, useContext, useEffect, useState } from "react";
import { Collection, Document, EditorError, FileType , DocumentContextType } from "@/components/Types";
import { singular } from "pluralize";
import { createPost, getPostBySlug } from "@/utils/Db/Actions/Post";
import { AlertCircleIcon } from "lucide-react";
import convert from 'url-slug';
import { useRouter } from "next/navigation";
import { MetaTitle } from "@brandonowens/elegant-ui";
import { cn } from "@/utils/utils";
import DeleteModal from "../DeleteModal";

export default function EditDocument({
    session,
    collection,
    slug,
    collections
}:{
    session: Session,
    collection: Collection;
    slug: string;
    collections: Collection[];
}) {
    useEffect(() => {
        if(slug === 'new') {
            document.title = `New ${singular(collection.title)[0].toUpperCase() + singular(collection.title).slice(1)} - ${MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "", "Elegant CMS")}`;
        }
    }, []);

    const { editor } = useEditor({});
    const [ saving, setSaving ] = useState(false);
    const [ loaded, setLoaded ] = useState(false);    
    const [ hasChanges, setHasChanges ] = useState(false);
    const [ hasCustomSlug, setHasCustomSlug ] = useState(false);
    const [ doc, setDocument ] = useState({
        id: "",
        title: "",
        status: "DRAFT",
        description: "",
        coverImage: "",
        content: "",
        slug: "",
        tags: [] as string[],
        publishedAt: new Date(),
        authors: []
    } as Document);
    const [ files, setFiles ] = useState<FileType[]>([]);
    const [ errors, setErrors ] = useState<EditorError[]>([]);
    const [ showDiscardModal, setShowDiscardModal ] = useState(false);
    const router = useRouter();

    const getDocument = async() => {
        const result = await getPostBySlug(slug, collection.title);

        setDocument({
            id: result?.id,
            title: result?.title || "",
            status: result?.status || "DRAFT",
            description: result?.description || "",
            coverImage: result?.coverImage || "",
            content: result?.content || "",
            slug: result?.slug || "",
            tags: result?.tags || [] as string[],
            publishedAt: result?.publishedAt || new Date(),
            //@todo: set authors
            authors: []
        });

        if(result){
            document.title = `${result.title[0].toUpperCase() + result.title.slice(1)} - ${MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "", "Elegant CMS")}`;
        }
    };

    useEffect(() => {
        if(slug !== "new") {
            getDocument();
        }
    }, [slug]);

    useEffect(() => {
        if(editor && !loaded) {
            setLoaded(true);
            editor.commands.setContent(
                doc.content
            );
        }
    }, [doc.content]);

    const onSave = async() => {
        const formErrors = [];

        if(doc.title === "") {
            formErrors.push({
                element: "title",
                message: "Title is required."
            });
        }

        if(editor.isEmpty) {
            formErrors.push({
                element: "editor",
                message: "Content is required."
            });
        }

        if(doc.slug === "") {
            formErrors.push({
                element: "slug",
                message: "A URL slug is required."
            });
        }

        if(slug === "new" && doc.slug !== "") {
            // check that this slug is unique
            const result = await getPostBySlug(
                doc.slug,
                collection.title.toLowerCase()
            );

            if(result) {
                formErrors.push({
                    element: "slug",
                    message: "This URL slug is already in use."
                });
            }
        }

        if(formErrors.length > 0) {
            setErrors(formErrors);
        }
        else {
            setSaving(true);

            await createPost({
                id: doc.id || "",
                title: doc.title,
                status: doc.status,
                description: doc.description || "",
                coverImage: doc.coverImage || "",
                content: editor.storage.markdown.getMarkdown(),
                authors: [{
                    id: session.user?.id || "",
                }],
                slug: doc.slug,
                collection: collection,
                tags: doc.tags,
                publishedAt: doc.publishedAt
            }).then(() => {
                setSaving(false);

                if(slug === 'new' || slug !== doc.slug) {
                    router.push(`/admin/${collection.title.toLowerCase()}/${doc.slug}`);
                }
                else{
                    window.location.reload();
                }
            });
        }
    };

    return(
        <DocumentContext.Provider value={{ 
            collection,
            document:doc,
            setDocument,
            editor,
            files,
            hasChanges,
            hasCustomSlug,
            setHasCustomSlug,
            setFiles,
            setHasChanges,
            errors,
            setErrors
        }}>
            <DashboardLayout 
                session={session}
                collections={collections}
            >
                {hasChanges && (
                    <div className="sticky top-0 z-40 flex justify-end h-16 shrink-0 items-center gap-x-6 border-b border-white/5 px-4 shadow-sm sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() => setShowDiscardModal(true)}
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full sm:w-auto justify-center sm:justify-between inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer"
                            onClick={() => {
                                onSave();
                            }}
                        >
                            {saving ? (
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
                <div className="flex max-w-screen-xl flex-col space-y-12 p-5">
                    <div className="min-h-full prose prose-xl">
                        <div className={
                            cn(
                                'relative rounded-md w-full md:w-[calc(100%-256px)] px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset focus-within:ring-2',
                                errors.some(error => error.element === "title")
                                ? "ring-red-300 focus-within:ring-red-600" 
                                : "ring-gray-300 focus-within:ring-indigo-600"
                            )
                        }>
                            <label htmlFor="title" className={
                                cn(
                                    "block text-xs font-medium",
                                    errors.some(error => error.element === "title")
                                    ? "text-red-500" 
                                    : "text-gray-900"
                                )
                            }>
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className={
                                    cn(
                                        'block w-full border-0 p-0 outline-none focus:ring-0 sm:text-sm sm:leading-6',
                                        errors.some(error => error.element === "title")
                                        ? "placeholder:text-red-300" 
                                        : "text-gray-900 placeholder:text-gray-400"
                                    )
                                }
                                placeholder={`Your ${singular(collection.title)} title`}
                                defaultValue={doc.title}
                                onChange={(e) => {
                                    doc.title = e.target.value;
                                    setDocument(doc);
                                    setHasChanges(true);

                                    if(errors.some(error => error.element === "title")) {
                                        setErrors(errors.filter(e => e.element !== "title"));
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key.toLowerCase() === 'enter') {
                                      e.preventDefault()
                                      editor.commands.focus('start')
                                    }
                                }}
                                onBlur={(e) => {
                                    if (slug === 'new' && !hasCustomSlug) {
                                        doc.slug = convert(e.target.value.toLowerCase(), {
                                            dictionary: { "'": '' }
                                        });

                                        setDocument(doc);
                                        setHasChanges(true);
                                    }                                
                                }}
                            />
                            {errors.some(error => error.element === "title") && (
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <AlertCircleIcon aria-hidden="true" className="h-5 w-5 fill-red-500 text-white" />
                                </div>
                            )}
                        </div>
                        <p id="title_error" className="mt-2 text-sm text-red-600">
                            {errors.find(error => error.element === "title")?.message}
                        </p>
                        <Editor editor={editor}/>
                    </div>
                    <div>
                        <DocumentSettings 
                            showDelete={slug !== 'new'}
                            collection={collection}
                            session={session}
                        />
                    </div>
                </div>
                {showDiscardModal && (
                    <DeleteModal 
                        title='Discard Changes'
                        open={showDiscardModal}
                        onClose={() => setShowDiscardModal(false)}
                        message='Are you sure you want to discard the changes you have made?'
                        children={
                            <>
                                <button
                                    type="button"
                                    onClick={() => {
                                        window.location.reload();
                                    }}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Discard
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setShowDiscardModal(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </>
                        }
                    />
                )}
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