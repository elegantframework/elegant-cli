interface Props {
    handle?: string;
    site?: string;
};

/**
 * Twitter card meta data.
 * @returns A list of twitter card meta data items for the seo component.
 */
const TwitterMeta = ({
    handle = "",
    site = "@"
}: Props) => {
    if(handle !== ""){
        // if a site twitter account has been provided
        if(site !== "@"){
            return {
                handle: handle,
                site: site,
                cardType: 'summary_large_image',
            };
        }
        
        // no site provided.. Render only a twitter handle and card
        return {
            handle: handle,
            cardType: 'summary_large_image',   
        };
    }
    else{
        return {
            cardType: 'summary_large_image',   
        };
    }
};

export default TwitterMeta;