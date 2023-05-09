interface Props {
    /**
     * The directory path of the favicons
     */
    directory?: string;
    /**
     * Display an icon for apple devices?
     */
    appleTouchIcon?: boolean;
    /**
     * Display an icon for android devices?
     */
    androidIcon?: boolean;
    /**
     * Display favicons?
     */
    favicon?: boolean;
};

/**
 * Generate a complete list of favicon meta links
 * @returns A completes list of favicons for different device types
 */
const Favicon = ({
    directory = "/favicons",
    appleTouchIcon = true,
    androidIcon = true,
    favicon = true
}: Props) => {

    let icons = [];

    if(appleTouchIcon){
        icons.push(
            {
                rel: 'apple-touch-icon',
                href: `${directory}/apple-icon-57x57.png`,
                sizes: '57x57'
            },
            {
                rel: 'apple-touch-icon',
                href: `${directory}/apple-icon-60x60.png`,
                sizes: '60x60'
            },
            {
                rel: 'apple-touch-icon',
                href: `${directory}/apple-icon-72x72.png`,
                sizes: '72x72'
            },
            {
                rel: 'apple-touch-icon',
                href: `${directory}/apple-icon-76x76.png`,
                sizes: '76x76'
            },
            {
                rel: 'apple-touch-icon',
                href: `${directory}/apple-icon-114x114.png`,
                sizes: '114x114'
            },
            {
                rel: 'apple-touch-icon',
                href: `${directory}/apple-icon-120x120.png`,
                sizes: '120x120'
            },
            {
                rel: 'apple-touch-icon',
                href: `${directory}/apple-icon-144x144.png`,
                sizes: '144x144'
            },
            {
                rel: 'apple-touch-icon',
                href: `${directory}/apple-icon-152x152.png`,
                sizes: '152x152'
            },
            {
                rel: 'apple-touch-icon',
                href: `${directory}/apple-icon-180x180.png`,
                sizes: '180x180'
            } 
        );
    }

    if(androidIcon){
        icons.push(
            {
                rel: 'icon',
                href: `${directory}/android-icon-192x192.png`,
                sizes: '192x192'
            },
            {
                rel: 'manifest',
                href: `${directory}/manifest.json`
            }
        );
    }

    if(favicon){
        icons.push(
            {
                rel: 'icon',
                href: `${directory}/favicon-16x16.png`,
                sizes: '16x16'
            },
            {
                rel: 'icon',
                href: `${directory}/favicon-32x32.png`,
                sizes: '32x32'
            },
            {
                rel: 'icon',
                href: `${directory}/favicon-96x96.png`,
                sizes: '96x96'
            },
        );
    }

    return icons;
};

export default Favicon;