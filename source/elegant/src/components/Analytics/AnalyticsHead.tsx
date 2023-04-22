interface Props {
  /**
   * Google Analytics tracking id
   */
  googleAnalyticsID: string
}

/**
 * Create the required Google Analytics head script.
 * @returns A javascript "script" tag for the GA head code.
 */
const AnalyticsHead = ({googleAnalyticsID = ''}: Props) => {
    if(googleAnalyticsID !== '')
    {
        return (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${googleAnalyticsID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
        );
    }
    else{
        return null;
    }
};

export default AnalyticsHead;