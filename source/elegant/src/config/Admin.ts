/**
 * The Elegant admin panel configuration.
 * Our config is bootstrapped from our .env values.
 * If no .env file is found, it will use the default values set here.
 */
const AdminConfig = () => {
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
        'cms_asset_path': process.env.NEXT_PUBLIC_CMS_ASSET_PATH || '',
    };
};

export default AdminConfig;