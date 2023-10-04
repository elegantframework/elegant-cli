import TwitterMeta from "./TwitterMeta";

describe('Twitter meta component', () => {
    it('renders with data properly', () => {
        const result = TwitterMeta({
            handle: "@test"
        });

        expect(result).toMatchSnapshot();
    });

    it('renders with site data properly', () => {
        const result = TwitterMeta({
            handle: "@test2",
            site: "@site_test"
        });

        expect(result).toMatchSnapshot();
    });

    it('renders `the default if nothing is provided`', () => {
        const result = TwitterMeta({
            handle: "",
        });

        expect(result).toMatchSnapshot();
    });
});