import AppConfig from "@/config/App";

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
    }
};

export default Config;