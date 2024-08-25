import { useContext, useEffect, useState } from "react";
import DateTimePicker from "../DateTimePicker";
import Accordion from "./Accordion";
import Input from "./Input";
import TextArea from "./TextArea";
import { DocumentContext } from "./Pages/EditDocument";
import DeleteDocumentButton from "./DeleteDocumentButton";
import { Collection } from "../Types";
import CoverImage from "./CoverImage";
import { Session } from "next-auth";

export default function DocumentSettings({
    showDelete,
    collection,
    session
}:{
    showDelete: boolean;
    collection: Collection;
    session: Session;
}
) {
    const { document, setDocument, setHasChanges, setHasCustomSlug, setErrors, errors } = useContext(DocumentContext);
    const [ tagInput, setTagInput ] = useState("");
    const [ newTags, setNewTags ] = useState<string[]>([]);
    let tagsLoaded = false;

    useEffect(() => {
        if(document.tags && !tagsLoaded) {
          setNewTags(document.tags);
          tagsLoaded = true;
        }
    }, [document.tags]);
    
    return(
        <aside className="md:w-64 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:overflow-y-auto lg:border-l">
            <div className="relative hidden w-full items-center justify-between md:mb-4 md:mt-8 md:flex px-4">
                <DateTimePicker
                    id="publishedAt"
                    label="Date"
                    date={document.publishedAt}
                    setDate={(publishedAt) => {
                        document.publishedAt = publishedAt;
                        setDocument(document);
                        setHasChanges(true);
                    }}
                />
            </div>
            <div className="p-4 flex items-center justify-between">
                <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                    Status
                </label>
                <select
                    id="status"
                    name="status"
                    className="block rounded-md border-0 py-2 px-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 focus-visible:ring-indigo-600 outline-none sm:text-sm sm:leading-6"
                    onChange={(e) => {
                        document.status = (e.target.value === "DRAFT" ? "DRAFT" : "PUBLISHED");
                        setDocument(document);
                        setHasChanges(true);
                    }}
                >
                    <option 
                        value={'PUBLISHED'} 
                        selected={document.status === 'PUBLISHED'}
                    >
                        Published
                    </option>
                    <option 
                        value={'DRAFT'}
                        selected={document.status === 'DRAFT'} 
                    >
                        Draft
                    </option>
                </select>
            </div>
            <div
                className={`flex w-full pb-4 px-4 ${
                showDelete ? 'justify-between items-center' : 'justify-end'
                }`}
            >
                {showDelete && (
                    <DeleteDocumentButton
                        id={document.id || ""}
                        collection={collection.title}
                        className="hover:bg-slate-200 max-h-[2.25rem]"
                    />
                )}
            </div>
            <div className="w-full">
                <Accordion title="Author">
                    <Input
                        label="Name"
                        id="author.name"
                        defaultValue={session.user?.name}
                        wrapperClass="mb-4"
                        readOnly
                    />
                </Accordion>
                <Accordion 
                    title="URL Slug"
                    expand={
                        errors.some(error => error.element === "slug")
                    }
                >
                    <Input
                        label="Write a slug (optional)"
                        id="slug"
                        defaultValue={document.slug}
                        wrapperClass="mb-4"
                        onChange={(value) => {
                            document.slug = value;
                            setDocument(document);
                            setHasChanges(true);

                            if(value === "") {
                                setHasCustomSlug(true);
                            }
                            else {
                                setHasCustomSlug(false);
                            }

                            if(errors.some(error => error.element === "slug")) {
                                setErrors(errors.filter(e => e.element !== "slug"));
                            }
                        }}
                        error={
                            errors.find(error => error.element === "slug")?.message
                        }
                    />
                </Accordion>
                <Accordion title="Description">
                    <TextArea
                        id="description"
                        label="Write a description (optional)"
                        defaultValue={document.description}
                        onChange={(value) => {
                            document.description = value;
                            setDocument(document);
                            setHasChanges(true);
                        }}
                    />
                </Accordion>
                <Accordion title="Cover Image">
                    <CoverImage 
                        image={document.coverImage || ""}
                        onSave={(result) => {
                            document.coverImage = result;
                            setDocument(document);
                            setHasChanges(true);
                        }}
                    />
                </Accordion>
                <Accordion title="Tags">
                    {newTags.map((tag) => (
                        <span 
                            className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 mr-2"
                            key={`${tag}-tag`}
                        >
                            {tag}
                            <button 
                                className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
                                onClick={() => {
                                    setNewTags(
                                        newTags.filter(e => e !== tag)
                                    );

                                    document.tags = newTags.filter(e => e !== tag);
                                    setDocument(document);
                                    setHasChanges(true);
                                }}
                            >
                                <span className="sr-only">Remove</span>
                                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-700/50 group-hover:stroke-gray-700/75">
                                    <path d="M4 4l6 6m0-6l-6 6" />
                                </svg>
                                <span className="absolute -inset-1" />
                            </button>
                        </span>
                    ))}
                    <div className='mt-2'>
                        <label htmlFor="tag" className="block text-sm font-medium leading-6 text-gray-900">
                            Add Tag
                        </label>
                        <div className="mt-2 flex rounded-md shadow-sm">
                            <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                <input
                                    type="text"
                                    name="tag"
                                    id="add_tag"
                                    className="block w-full rounded-none rounded-l-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-indigo-500"
                                    onChange={(e) => {
                                        setTagInput(e.target.value);
                                    }}
                                    value={tagInput}
                                />
                            </div>
                            <button
                                type="button"
                                className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-indigo-300"
                                disabled={!isAddTagButtonEnabled(
                                    tagInput,
                                    newTags
                                )}
                                onClick={() => {
                                    setHasChanges(true);
                                    setNewTags([...newTags, tagInput]);
                                    document.tags = [...newTags, tagInput];
                                    setDocument(document);
                                    setTagInput("");
                                }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </Accordion>
                {/* {customFields &&
                Object.entries(customFields).map(([name, field]) => {
                    const Field = FieldDataMap[field.fieldType]
                    if (isArrayCustomField(field)) {
                    Field.props.suggestions = field.values
                    }
                    return (
                    <Accordion
                        key={name}
                        title={`${field.title}${field.required ? '*' : ''}`}
                        error={!!errors[name]?.message}
                    >
                        <Field.component
                        id={name}
                        label={field.description}
                        {...Field.props}
                        />
                    </Accordion>
                    )
                })} */}
            </div>
        </aside>
    );
}

function isAddTagButtonEnabled(tag: string, currentTags: string[]) {
    if(tag !== "" && !currentTags.includes(tag))
    {
        return true;
    }

    return false;
}