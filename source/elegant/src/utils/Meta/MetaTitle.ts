import TextToKebabCase from "@/utils/Text/TextToKebabCase";

/**
 * 
 * @param appName The application's name. Ex: "Elegant".
 * @param appTagline The application's tag line. Ex: "This App is Great!"
 * @returns An properly cased string for the applications meta title.
 */
const MetaTitle = (
    appName: string, 
    appTagline: string
) => {
    return appName + " - " + TextToKebabCase(appTagline);
};

export default MetaTitle;