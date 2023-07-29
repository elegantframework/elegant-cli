/**
 * The Elegant admin panel configuration.
 * Our config is bootstrapped from our .env values.
 * If no .env file is found, it will use the default values set here.
 */
const AdminConfig = () => {
    return {
        /*
        |--------------------------------------------------------------------------
        | CMS Panel Name
        |--------------------------------------------------------------------------
        |
        | This value is the name displayed in the title of your CMS panel.
        |
        */
        'cms_name': process.env.NEXT_PUBLIC_CMS_NAME || 'Elegant',
        
        /*
        |--------------------------------------------------------------------------
        | CMS Asset Path
        |--------------------------------------------------------------------------
        |
        | This is the path of your saved assets from your CMS panel. This value
        | should be left to it's default value of blank. The only time this value
        | is referenced is during core Elegant code development. 
        |
        |
        */
        'cms_asset_path': process.env.NEXT_PUBLIC_CMS_ASSET_PATH || '',

        /*
        |--------------------------------------------------------------------------
        | CMS Repository Branch
        |--------------------------------------------------------------------------
        |
        | This is the repository branch where your cms content will be created and stored.
        |
        |
        */
        'cms_repository_branch': process.env.NEXT_PUBLIC_CMS_REPOSITORY_BRANCH || 'main',

        /*
        |--------------------------------------------------------------------------
        | CMS GitHub ID
        |--------------------------------------------------------------------------
        |
        | This is the GitHub Client ID of your GitHub Oauth application.
        |
        |
        */
        'cms_github_id': process.env.NEXT_PUBLIC_CMS_GITHUB_ID || '',

         /*
        |--------------------------------------------------------------------------
        | CMS GitHub Secret
        |--------------------------------------------------------------------------
        |
        | This is the GitHub Client secret of your  
        |
        |
        */
        'cms_github_secret': process.env.NEXT_PUBLIC_CMS_GITHUB_SECRET || '',

         /*
        |--------------------------------------------------------------------------
        | CMS GitHub Token Secret
        |--------------------------------------------------------------------------
        |
        | This is a random string with at least 32 characters. 
        | You can generate a random string using the service below.
        |
        | https://onlinehashtools.com/generate-random-sha256-hash?&count=1
        |
        |
        */
        'cms_token_secret': process.env.NEXT_PUBLIC_CMS_TOKEN_SECRET || '',

         /*
        |--------------------------------------------------------------------------
        | CMS Repository Slug
        |--------------------------------------------------------------------------
        |
        | This is the slug of the repository where you store your content.
        | If empty AND on Vercel, this will default to VERCEL_GIT_REPO_SLUG.
        |
        |
        */
        'cms_repository_slug': process.env.NEXT_PUBLIC_CMS_REPOSITORY_SLUG || '',
    };
};

export default AdminConfig;