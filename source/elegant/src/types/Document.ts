import { Author } from "./Author";

/**
 * This is a document type that represents a markdown document.
 */
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