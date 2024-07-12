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
    title: string;
};

export type Document = {
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
    status: 'published' | 'draft';
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
    category?: string;
    /**
     * Tags that can be added to posts.
     */
    tags: string[];
};

export interface DocumentContextType {
    document: Document;
    hasChanges: boolean;
    setHasChanges: Dispatch<SetStateAction<boolean>>;
};