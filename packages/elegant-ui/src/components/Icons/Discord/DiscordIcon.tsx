import React from "react";

export interface DiscordIconProps {
    /**
     * Custom css classnames to be applied to the icon
     */
    className?: string;
};

/**
 * A Discord SVG Icon
 * @returns A Discord svg icon.
 */
export default function DiscordIcon({
    className = "w-5 h-5"
}: DiscordIconProps) {
    return(
        <svg
            viewBox="0 0 16 16"
            className={className}
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M13.5535 2.81854C12.5178 2.33396 11.4104 1.98178 10.2526 1.78125C10.1104 2.03832 9.94429 2.38409 9.82976 2.65915C8.599 2.47406 7.37956 2.47406 6.17144 2.65915C6.05693 2.38409 5.88704 2.03832 5.74357 1.78125C4.58454 1.98178 3.47584 2.33525 2.44013 2.8211C0.351095 5.97791 -0.215207 9.0563 0.0679444 12.091C1.4535 13.1257 2.79627 13.7542 4.11638 14.1655C4.44233 13.7169 4.73302 13.2401 4.98345 12.7375C4.5065 12.5563 4.04969 12.3326 3.61805 12.073C3.73256 11.9882 3.84457 11.8995 3.95279 11.8082C6.58546 13.0396 9.44593 13.0396 12.0472 11.8082C12.1566 11.8995 12.2686 11.9882 12.3819 12.073C11.949 12.3339 11.4909 12.5576 11.014 12.7388C11.2644 13.2401 11.5538 13.7182 11.881 14.1668C13.2024 13.7555 14.5464 13.127 15.932 12.091C16.2642 8.57301 15.3644 5.52289 13.5535 2.81854ZM5.34212 10.2247C4.55181 10.2247 3.9037 9.48688 3.9037 8.58843C3.9037 7.68998 4.53797 6.95091 5.34212 6.95091C6.14628 6.95091 6.79437 7.68868 6.78053 8.58843C6.78178 9.48688 6.14628 10.2247 5.34212 10.2247ZM10.6578 10.2247C9.86752 10.2247 9.21941 9.48688 9.21941 8.58843C9.21941 7.68998 9.85366 6.95091 10.6578 6.95091C11.462 6.95091 12.1101 7.68868 12.0962 8.58843C12.0962 9.48688 11.462 10.2247 10.6578 10.2247Z"/>
        </svg>
    );
};