interface Props {
    /**
     * The directory path of the favicons.
     */
    directory?: string;
    /**
     * Display an icon for microsoft devices?
     */
    microsoftIcon?: boolean;
    /**
     * The color of the Microsoft tile.
     */
    color?: string;
};

/**
 * The head meta component for rendering microsoft application data
 * @returns A microsoft tile icon list for the seo component.
 */
const MSApplicationTile = ({
    directory = "/favicons",
    microsoftIcon = true,
    color = "#ffffff"
}: Props) => {

    let data = [];

    if(microsoftIcon){
        data.push(
            {
                property: 'msapplication-TileColor',
                content: color
            },
            {
                property: 'msapplication-TileImage',
                content: `${directory}/ms-icon-144x144.png`
            }
        );    
    };

    return data;
};

export default MSApplicationTile;