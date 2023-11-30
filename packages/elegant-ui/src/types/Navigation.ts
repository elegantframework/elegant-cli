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