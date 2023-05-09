interface Props {
    /**
     * The directory path of the rss feeds.
     */
    directory?: string;
    /**
     * Include the rss feed in the meta head?
     */
    enabled?: boolean;
};

/**
 * Create the rss feed head meta object data for the SEO component.
 * @returns A complete list of rss feeds.
 */
const RSSFeedMeta = ({
    directory = "/feeds",
    enabled = true,
}: Props) => {

    let data = [];

    if(enabled){
        data.push(
            {
                rel: 'alternate',
                type: 'application/rss+xml',
                title: 'RSS 2.0',
                href: `${directory}/feed.xml`
            },
            {
                rel: 'alternate',
                type: 'application/atom+xml',
                title: 'Atom 1.0',
                href: `${directory}/atom.xml`
            },
            {
                rel: 'alternate',
                type: 'application/json',
                title: 'JSON Feed',
                href: `${directory}/feeds.json`
            }
        );    
    };

    return data;
};

export default RSSFeedMeta;