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
    };
};

export default AdminConfig;