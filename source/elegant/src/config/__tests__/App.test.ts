import AppConfig from './../App';

describe('App Config', () => {
    // we need to mock out process.env functionality to test when an .env file isn't loaded
    const env = process.env;

    beforeEach(() => {
        jest.resetModules()
        process.env = { ...env }
    });

    afterEach(() => {
        process.env = env
    });

    it('returns an application name when an environment variable is passed',() => {
        expect(AppConfig().name).toBe("Elegant - The unit testing application.");
        expect(AppConfig().convert_action_url).toBe("https://example.com/convertkit/post");
        expect(AppConfig().instagram_url).toBe("http://instagram.com/yourProfile");
        expect(AppConfig().description).toBe("A unit test first frontend framework for rapidly building beautiful and elegant web applications.");
        expect(AppConfig().tagline).toBe("The Unit Test First Framework for React Developers");
    });

    it('returns the base config name when no env file is present',() => {

        process.env.NEXT_PUBLIC_APP_NAME = undefined;
        process.env.NEXT_PUBLIC_CONVERTKIT_ACTION_URL = undefined;
        process.env.NEXT_PUBLIC_APP_INSTAGRAM_URL = undefined;
        process.env.NEXT_PUBLIC_APP_DESCRIPTION = undefined;
        process.env.NEXT_PUBLIC_APP_TAGLINE = undefined;

        expect(AppConfig().name).toBe("Elegant");
        expect(AppConfig().convert_action_url).toBe("");
        expect(AppConfig().instagram_url).toBe("");
        expect(AppConfig().description).toBe("A content creation framework for rapidly building beautiful and expressive web applications.");
        expect(AppConfig().tagline).toBe("Elevate your creative content.");

    });
});