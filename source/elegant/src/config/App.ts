/**
 * The Elegant application configuration.
 * Our config is bootstrapped from our .env values.
 * If no .env file is found, it will use the default values set here.
 */
const AppConfig = () => {
    return {

        /*
        |--------------------------------------------------------------------------
        | Application Name
        |--------------------------------------------------------------------------
        |
        | This value is the name of your application. This value is used when the
        | framework needs to place the application's name in a notification or
        | any other location as required by the application or its packages.
        |
        */
        'name': process.env.NEXT_PUBLIC_APP_NAME || "Elegant",

        /*
        |--------------------------------------------------------------------------
        | Application Description
        |--------------------------------------------------------------------------
        |
        | This value is the description of your application. 
        |
        */
        'description': process.env.NEXT_PUBLIC_APP_DESCRIPTION || "A content creation framework for rapidly building beautiful and expressive web applications.",

        /*
        |--------------------------------------------------------------------------
        | Application Tagline
        |--------------------------------------------------------------------------
        |
        | 
        |
        */
        'tagline': process.env.NEXT_PUBLIC_APP_TAGLINE || "Elevate your creative content.",

        /*
        |--------------------------------------------------------------------------
        | Application URL
        |--------------------------------------------------------------------------
        |
        | This URL is used by Elegant to properly generate URLs during build.
        | You should set this to the root of where your application is running.
        |
        */
        'url': process.env.NEXT_PUBLIC_APP_URL || "https://elegantframework.com",

        /*
        |--------------------------------------------------------------------------
        | Application Repository
        |--------------------------------------------------------------------------
        |
        | The GitHub URL of the application source code.
        |
        */
        'repository': process.env.NEXT_PUBLIC_APP_REPOSITORY || "",

        /*
        |--------------------------------------------------------------------------
        | Application Type
        |--------------------------------------------------------------------------
        |
        | The type of Elegant application.
        |
        */
        'type': process.env.NEXT_PUBLIC_APP_TYPE || "Organization",

        /*
        |--------------------------------------------------------------------------
        | Twitter Handle
        |--------------------------------------------------------------------------
        |
        |
        */
        'twitter_handle': process.env.NEXT_PUBLIC_APP_TWITTER_HANDLE || "",

        /*
        |--------------------------------------------------------------------------
        | Twitter Site Handle
        |--------------------------------------------------------------------------
        |
        |
        */
        'twitter_site_handle': process.env.NEXT_PUBLIC_APP_TWITTER_SITE_HANDLE || "",

        /*
        |--------------------------------------------------------------------------
        | Convert Kit Action URL
        |--------------------------------------------------------------------------
        |
        |
        */
        'convert_action_url': process.env.NEXT_PUBLIC_CONVERTKIT_ACTION_URL || "",

        /*
        |--------------------------------------------------------------------------
        | Google Analytics ID
        |--------------------------------------------------------------------------
        |
        |
        */
        'google_analytics_id': process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "",

        /*
        |--------------------------------------------------------------------------
        | Facebook App ID
        |--------------------------------------------------------------------------
        |
        |
        */
        'facebook_app_id': process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",

        /*
        |--------------------------------------------------------------------------
        | Twitter URL
        |--------------------------------------------------------------------------
        |
        |
        */
        'twitter_url': process.env.NEXT_PUBLIC_APP_TWITTER_URL || "",

        /*
        |--------------------------------------------------------------------------
        | Facebook URL
        |--------------------------------------------------------------------------
        |
        |
        */
        'facebook_url': process.env.NEXT_PUBLIC_APP_FACEBOOK_URL || "",

        /*
        |--------------------------------------------------------------------------
        | Instagram URL
        |--------------------------------------------------------------------------
        |
        |
        */
        'instagram_url': process.env.NEXT_PUBLIC_APP_INSTAGRAM_URL || "",

        /*
        |--------------------------------------------------------------------------
        | Youtube URL
        |--------------------------------------------------------------------------
        |
        |
        */
        'youtube_url': process.env.NEXT_PUBLIC_APP_YOUTUBE_URL || "",

        /*
        |--------------------------------------------------------------------------
        | LinkedIn URL
        |--------------------------------------------------------------------------
        |
        |
        */
        'linkedin_url': process.env.NEXT_PUBLIC_APP_LINKEDIN_URL || "",

        /*
        |--------------------------------------------------------------------------
        | Application Contact Email
        |--------------------------------------------------------------------------
        | The public contact email to be displayed to users. 
        | Currently only used on the Trademark Policy page.
        |
        */
        'contact_email': process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    };
};

export default AppConfig;