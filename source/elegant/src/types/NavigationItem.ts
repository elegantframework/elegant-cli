/**
 * A navigation item for the header navigation
 */
export interface NavigationItem {
    /**
     * The url of the navigation item
     */
    href: string;
    /**
     * The url path to show the this link as Active.
     */
    path: string;
    /**
     * The label of the navigation item to be displayed to the user.
     */
    label: string;
};