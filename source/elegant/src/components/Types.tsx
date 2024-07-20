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
    picture?: string;
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
     * The author of this document.
     */
    author: Author;
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
     * The category of this document.
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
     * Set the files to be uploaded.
     */
    setFiles: Dispatch<SetStateAction<FileType[]>>; 
    /**
     * Set if the document has changes or not.
     */
    setHasChanges: Dispatch<SetStateAction<boolean>>;
};

export interface FileType {
    type: 'images';
    blob?: string;
    filename: string;
    content: string;
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