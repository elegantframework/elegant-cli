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