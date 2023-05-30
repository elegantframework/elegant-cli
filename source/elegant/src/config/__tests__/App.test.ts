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

      let result = AppConfig().name;

      expect(result).toBe("Elegant - The unit testing application.");
    });

    it('returns the base config name when no env file is present',() => {

        process.env.NEXT_PUBLIC_APP_NAME = undefined;
        
        let result = AppConfig().name;
  
        expect(result).toBe("Elegant");
    });

    it('matches the existing snapshot when an env var is set',() => {
        expect(AppConfig()).toMatchSnapshot();
    });
});