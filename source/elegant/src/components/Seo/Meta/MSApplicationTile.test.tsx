import MSApplicationTile from "./MSApplicationTile";

describe('Microsoft Application Tile Component', () => {
    it('renders with data properly', () => {
        const result = MSApplicationTile({
            directory: "",
            color: "#000000"
        }); 

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    content: '#000000',
                    property: 'msapplication-TileColor',
                })
            ])
        );

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    content: '/ms-icon-144x144.png',
                    property: 'msapplication-TileImage',
                })
            ])
        );

        expect(result).toMatchSnapshot();
    });
});