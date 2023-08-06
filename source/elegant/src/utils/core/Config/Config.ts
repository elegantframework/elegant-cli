import AppConfig from "@/config/App";
import AdminConfig from "@/config/Admin";

interface Props {
    /**
     * The configuration value to get.
     */
    value: Config;
};

/**
 * Get a core Elegant configuration value.
 */
const Config = (value: string) => {
    switch(value){
        case 'app.name':
            return AppConfig().name; 
        case 'app.description':
            return AppConfig().description; 
        case 'app.tagline':
            return AppConfig().tagline; 
        case 'app.url':
            return AppConfig().url; 
        case 'app.repository':
            return AppConfig().repository; 
        case 'app.type':
            return AppConfig().type; 
        case 'app.twitter_handle':
            return AppConfig().twitter_handle; 
        case 'app.twitter_site_handle':
            return AppConfig().twitter_site_handle; 
        case 'app.convert_action_url':
            return AppConfig().convert_action_url; 
        case 'app.google_analytics_id':
            return AppConfig().google_analytics_id; 
        case 'app.facebook_app_id':
            return AppConfig().facebook_app_id; 
        case 'app.twitter_url':
            return AppConfig().twitter_url; 
        case 'app.facebook_url':
            return AppConfig().facebook_url; 
        case 'app.instagram_url':
            return AppConfig().instagram_url; 
        case 'app.youtube_url':
            return AppConfig().facebook_url; 
        case 'app.linkedin_url':
            return AppConfig().linkedin_url; 
        case 'app.contact_email':
            return AppConfig().contact_email; 
        case 'admin.cms_name':
            return AdminConfig().cms_name; 
        case 'admin.cms_repository_branch':
            return AdminConfig().cms_repository_branch; 
        case 'admin.cms_github_id':
            return AdminConfig().cms_github_id; 
        case 'admin.cms_github_secret':
            return AdminConfig().cms_github_secret; 
        case 'admin.cms_token_secret':
            return AdminConfig().cms_token_secret; 
        case 'admin.cms_repository_slug':
            return AdminConfig().cms_repository_slug; 
        case 'admin.cms_repository_owner':
            return AdminConfig().cms_repository_owner; 
        case 'admin.cms_content_path':
            return AdminConfig().cms_content_path; 
        case 'admin.cms_monorepo_path':
            return AdminConfig().cms_monorepo_path; 
        case 'admin.cms_asset_path':
            return AdminConfig().cms_asset_path; 
        default:
            return "";
    }
};

export default Config;