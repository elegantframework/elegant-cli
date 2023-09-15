import { NextSeo } from 'next-seo';
import Favicon from './Favicon/Favicon';
import MSApplicationTile from './Meta/MSApplicationTile';
import TwitterMeta from './Meta/TwitterMeta';
import RSSFeedMeta from './Meta/RSSFeedMeta';

interface Props {
    /**
     * The title of the app.
     */
    title?: string;
    /**
     * The description of the app.
     */
    description?: string;
    /**
     * The web applications name
     */
    siteName?: string;
    /**
     * The theme color.
     */
    themeColor?: string;
    /**
     * The twitter creator handle.
     */
    twitterHandle?: string;
    /**
     * The twitter site handle. 
     */
    twitterSite?: string;
    /**
     * The url of the elegant web application.
     */
    url?: string;
    /**
     * Image used for twitter cards and open graph data.
     */
    image?: string;
    /**
     * Used for Facebook insights
     */
    facebookAppID?: string;
    /**
     * The type of page.. For the open graph. Ex. website, video.move, article, book, profile 
     */
    pageType?: string;
    /**
     * Should this page be set to noindex?
     */
    noIndex?: boolean;
};

/**
 * A simple SEO head component for rendering all of the perfect seo meta data you could need.
 * @returns All of the seo meta data needed to inject into the html head component.
 */
export default function Seo({
    title = "",
    description = "",
    siteName = "",
    themeColor = "#ffffff",
    twitterHandle = "",
    twitterSite = "",
    url = "",
    image = "",
    facebookAppID = "",
    pageType = "website",
    noIndex = false
}: Props) {
    return(
        <NextSeo 
            canonical={url}
            description={description}
            facebook={{
                appId: facebookAppID
            }}
            openGraph={{
                url: url,
                title: title,
                type: pageType,
                description: description,
                siteName: siteName,
                images: [
                    {url: image}
                ]
            }}
            themeColor={themeColor}
            title={title}
            twitter={
                TwitterMeta({
                    handle: twitterHandle,
                    site: twitterSite
                })
            }
            additionalLinkTags={
                Favicon({
                    directory: "/favicons"
                }).concat(
                    RSSFeedMeta({})
                )
            }
            additionalMetaTags={
                MSApplicationTile({
                    directory: "/favicons",
                    color: themeColor
                })
            }
            noindex={noIndex}
            nofollow={noIndex}
        />
    );
};