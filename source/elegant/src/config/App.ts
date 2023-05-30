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
       
        'name': process.env.NEXT_PUBLIC_APP_NAME || "Elegant"
    };
};

export default AppConfig;