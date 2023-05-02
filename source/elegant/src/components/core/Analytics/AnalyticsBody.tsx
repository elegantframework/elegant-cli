import Script from "next/script"

interface Props {
    /**
     * Google Analytics tracking id
     */
    googleAnalyticsID: string
}

/**
 * Creates the required Google Analytics body script code.
 * @returns A javascript "script" tag for the GA body code.
 */
const AnalyticsBody = ({googleAnalyticsID = ''}: Props) => {
    if(googleAnalyticsID !== '')
    {
        /**
         * Global Site Tag (gtag.js) - Google Analytics
         */
        return (
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsID}`}
            />
        );
    }
    else{
        return null;
    }
};

export default AnalyticsBody;