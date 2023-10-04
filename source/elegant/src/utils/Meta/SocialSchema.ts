import Config from '@/utils/Config/Config';

/**
 * Put our social data from our env vars into an object.
 * @returns An object with our social schema data.
 */
const SocialSchema = () => {
    let socialSchema = [];

    if(Config('app.twitter_url') !== ""){
        socialSchema.push(Config('app.twitter_url'));
    }

    if(Config('app.facebook_url') !== ""){
        socialSchema.push(Config('app.facebook_url'));
    }
    
    if(Config('app.instagram_url') !== ""){
        socialSchema.push(Config('app.instagram_url'));
    }

    if(Config('app.youtube_url') !== ""){
        socialSchema.push(Config('app.youtube_url'));
    }

    if(Config('app.linkedin_url') !== ""){
        socialSchema.push(Config('app.linkedin_url'));
    }
    
    return socialSchema;
};

export default SocialSchema;