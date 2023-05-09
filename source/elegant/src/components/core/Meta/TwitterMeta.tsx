
interface Props {
    /**
     * The website creators Twitter handle. Ex. @tailwindcss
     */
    twitterHandle: string;
};

/**
 * @deprecated since version 2.2 .. Will be removed in version 3... Replaced with the core SEO component
 * If a twitter handle is provided, return the twitter heading card meta data.
 * @param param0 component props.
 * @returns Twitter site and creator meta heading tags.
 */
const TwitterMeta = ({twitterHandle}: Props) => 
{
    // if there isn't a handle provided, return nothing
    if(twitterHandle === "")
    {
        return null;
    }

    return(
        <>
            <meta key="twitter:site" name="twitter:site" content="@thebrandonowens" />
            <meta key="twitter:creator" name="twitter:creator" content="@thebrandonowens" />
        </> 
    );
}

export default TwitterMeta;