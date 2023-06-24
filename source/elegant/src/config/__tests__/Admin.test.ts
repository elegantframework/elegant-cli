import AdminConfig from './../Admin';

describe('Admin Config', () => {
    // we need to mock out process.env functionality to test when an .env file isn't loaded
    const env = process.env;

    beforeEach(() => {
        jest.resetModules()
        process.env = { ...env }
    });

    afterEach(() => {
        process.env = env
    });

    it('returns a proper file path during Elegant core development',() => {
        expect(AdminConfig().cms_asset_path).toBe("source/elegant/");
    });

    it('returns no file path when Elegant core code is not being developed',() => {
        process.env.NEXT_PUBLIC_CMS_ASSET_PATH = undefined;
        expect(AdminConfig().cms_asset_path).toBe("");

    });
});