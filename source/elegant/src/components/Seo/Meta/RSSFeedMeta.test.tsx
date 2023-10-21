import RSSFeedMeta from "./RSSFeedMeta";


describe('RSS Feed meta Component', () => {
    it('renders with data properly', () => {
        const result = RSSFeedMeta({
            directory: "",
        }); 

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    rel: 'alternate',
                    type: 'application/rss+xml',
                    title: 'RSS 2.0',
                    href: `/feed.xml`
                })
            ])
        );

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    rel: 'alternate',
                    type: 'application/atom+xml',
                    title: 'Atom 1.0',
                    href: `/atom.xml`
                })
            ])
        );

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    rel: 'alternate',
                    type: 'application/json',
                    title: 'JSON Feed',
                    href: `/feeds.json`
                })
            ])
        );

        expect(result).toMatchSnapshot();
    });
});