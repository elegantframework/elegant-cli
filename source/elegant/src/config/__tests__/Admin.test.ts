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

    it('returns a proper CMS panel name', () => {
        expect(AdminConfig().cms_name).toBe("Testing");

        process.env.NEXT_PUBLIC_CMS_NAME = undefined;
        expect(AdminConfig().cms_name).toBe("Elegant");
    });
    
    it('returns a proper CMS repository branch', () => {
        expect(AdminConfig().cms_repository_branch).toBe("unit/test");

        process.env.NEXT_PUBLIC_CMS_REPOSITORY_BRANCH = undefined;
        expect(AdminConfig().cms_repository_branch).toBe("main");

        process.env.NEXT_PUBLIC_CMS_REPOSITORY_BRANCH = "hello/world";
        expect(AdminConfig().cms_repository_branch).toBe("hello/world");
    });

    it('returns a proper CMS github id', () => {
        expect(AdminConfig().cms_github_id).toBe("9765ab0581dddb2e73d22");

        process.env.NEXT_PUBLIC_CMS_GITHUB_ID = undefined;
        expect(AdminConfig().cms_github_id).toBe("");
    });

    it('returns a proper CMS github secret', () => {
        expect(AdminConfig().cms_github_secret).toBe("2vd9as9dsa363889cdsjnadskbs3ce4ddd27c8ad31aba1c02");

        process.env.NEXT_PUBLIC_CMS_GITHUB_SECRET = undefined;
        expect(AdminConfig().cms_github_secret).toBe("");
    });

    it('returns a proper CMS token secret', () => {
        expect(AdminConfig().cms_token_secret).toBe("0ae65b8489609dnjkasdnaskndkasde83c46dawvf79ea9bd1edc77f81599nef");

        process.env.NEXT_PUBLIC_CMS_TOKEN_SECRET = undefined;
        expect(AdminConfig().cms_token_secret).toBe("");
    });

    it('returns a proper CMS repository slug', () => {
        expect(AdminConfig().cms_repository_slug).toBe("unit-test-repo");

        process.env.NEXT_PUBLIC_CMS_REPOSITORY_SLUG = undefined;
        expect(AdminConfig().cms_repository_slug).toBe("");
    });

    it('returns a proper CMS repository owner', () => {
        expect(AdminConfig().cms_repository_owner).toBe("testerowner");

        process.env.NEXT_PUBLIC_CMS_REPOSITORY_OWNER = undefined;
        expect(AdminConfig().cms_repository_owner).toBe("");
    });

    it('returns a proper CMS content path', () => {
        expect(AdminConfig().cms_content_path).toBe("src/test/pages");

        process.env.NEXT_PUBLIC_CMS_CONTENT_PATH = undefined;
        expect(AdminConfig().cms_content_path).toBe("_content");
    });

    it('returns a proper CMS monorepo path', () => {
        expect(AdminConfig().cms_monorepo_path).toBe("hello/world");

        process.env.NEXT_PUBLIC_CMS_MONOREPO_PATH = undefined;
        expect(AdminConfig().cms_monorepo_path).toBe("");
    });

    it('returns a proper CMS asset path', () => {
        expect(AdminConfig().cms_asset_path).toBe("unit/test/path");

        process.env.NEXT_PUBLIC_CMS_ASSET_PATH = undefined;
        expect(AdminConfig().cms_asset_path).toBe("public/images");
    });
});