import { Editor } from "@tiptap/react";
import { Dispatch, SetStateAction } from "react";

export interface Author {
    /**
     * The name of the author.
     */
    name?: string;
    /**
     * The avatar image url of the author.
     */
    image?: string;
};

export interface Collection {
    /**
     * The unique id of the collection.
     */
    id?: string;
    /**
     * The title of the collection.
     */
    title: string;
};

export interface Document {
    /**
     * The unique id of the document.
     */
    id?: string;
    /**
     * A list of authors who contributed to this document.
     */
    authors: Author[];
    /**
     * The title of this document.
     */
    title: string;
    /**
     * The date on which this document was published.
     */
    publishedAt: Date;
    /**
     * The content of this document.
     */
    content: string;
    /**
     * The status of this document.
     */
    status: 'DRAFT' | 'PUBLISHED';
    /**
     * The url slug of this document.
     */
    slug: string;
    /**
     * The description of this document.
     */
    description?: string;
    /**
     * The image url for the cover image of this document.
     */
    coverImage?: string;
    /**
     * The collection that this document belongs to.
     */
    collection?: string[];
    /**
     * Tags that can be added to posts.
     */
    tags: string[];
};

export interface DocumentContextType {
    /**
     * The collection that this document belongs to.
     */
    collection: Collection;
    /**
     * The editable document.
     */
    document: Document;
    /**
     * Set the document content.
     */
    setDocument:  Dispatch<SetStateAction<Document>>;
    /**
     * The TipTap editor.
     */
    editor: Editor;
    /**
     * Any files such as images to included in the document.
     */
    files: FileType[];
    /**
     * The document has changes.
     */
    hasChanges: boolean;
    /**
     * Has the user entered a custom url slug?
     */
    hasCustomSlug: boolean;
    /**
     * Set the files to be uploaded.
     */
    setFiles: Dispatch<SetStateAction<FileType[]>>; 
    /**
     * Set if the document has changes or not.
     */
    setHasChanges: Dispatch<SetStateAction<boolean>>;
       /**
     * Set if the document has a custom url slug or not.
     */
    setHasCustomSlug: Dispatch<SetStateAction<boolean>>;
    /**
     * Validation errors within the editor.
     */
    errors: EditorError[];
    /**
     * Set validation errors.
     */
    setErrors: Dispatch<SetStateAction<EditorError[]>>; 
};

export interface EditorError {
    /**
     * The element with the error.
     */
    element: string;
    /**
     * The error message.
     */
    message: string;
};

export interface FileType {
    type: 'images';
    blob?: string;
    filename: string;
    content: string;
};

/**
 * An html heading element.
 */
export interface Heading {
    /**
     * The id of this heading.
     */
    id: string;
    /**
     * The top of this headings position.
     */
    top: number;
};

export interface NavigationItem {
    /**
     * The name of the navigation item to be displayed.
     */
    name: string; 
    /**
     * The url of the navigation item.
     */
    href: string; 
    /**
     * The this link active?
     */
    isActive: boolean; 
    /**
     * An icon to be displayed next to the navigation link.
     */
    icon: JSX.Element;
};

/**
 * A url link with a title.
 */
export interface NavigationLink {
    /**
     * The title of the URL.
     */
    title: string;
    /**
     * The actual url link.
     */
    href: string;
    /**
     * Is this url to an external website?
     */
    external?: boolean;
};

/**
 * A section of url links.
 */
export interface NavigationSection {
    /**
     * The title of this navigation section.
     */
    title: string;
    /**
     * A list of url navigation links.
     */
    links: NavigationLink[];
};

export interface R2Config {
    accountId: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
    publicBucketUrl: string;
};

/**
 * A navigation item to be used within the auto generated table of contents.
 */
export interface TableOfContentsItem {
    /**
     * The title of this table of contents item.
     */
    title: string;
    /**
     * The url slug for this table of contents item.
     */
    slug: string;
    /** 
     * Children table of contents elements.
     */
    children: TableOfContentsItem[];
};