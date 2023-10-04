import Favicon from "./Favicon"

describe('SEO Favicon Component', () => { 
    it('renders with data properly', () => { 
        const result = Favicon({
            directory: ""
        }); 

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    rel: 'apple-touch-icon',
                    href: `/apple-icon-60x60.png`,
                    sizes: '60x60' 
                })
            ])
        );

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    rel: 'icon',
                    href: `/android-icon-192x192.png`,
                    sizes: '192x192' 
                })
            ])
        );

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    rel: 'icon',
                    href: `/favicon-32x32.png`,
                    sizes: '32x32'
                })
            ])
        );

        expect(result).toMatchSnapshot();
    });

    it('renders properly with the directory', () => { 
        const result = Favicon({
            directory: "/helloworld"
        }); 

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    rel: 'apple-touch-icon',
                    href: `/helloworld/apple-icon-60x60.png`,
                    sizes: '60x60' 
                })
            ])
        );

        expect(result).toMatchSnapshot();
    });

    it('properly with options disabled', () => { 
        const result = Favicon({
            appleTouchIcon: false
        }); 

        expect(result).toEqual(
            expect.not.arrayContaining([
                expect.objectContaining({
                    rel: 'apple-touch-icon',
                    href: `/apple-icon-60x60.png`,
                    sizes: '60x60' 
                })
            ])
        );

        expect(result).toMatchSnapshot();
    });
});