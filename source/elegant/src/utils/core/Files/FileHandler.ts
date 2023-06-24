import Config from "../Config/Config";

/**
 * Get the file path for saved file assets from the CMS panel
 * 
 * @returns A string file path where assets from the CMS panel are stored. 
 * The admin.cms_asset_path is only set during core Elegant code development.
 */
const GetSavedFilePath = () => {
    return Config('admin.cms_asset_path') + 'public/';
};

export default GetSavedFilePath;