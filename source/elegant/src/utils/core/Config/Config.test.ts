import Config from './Config';

describe('Config', () => {

     // we need to mock out process.env functionality to test when an .env file isn't loaded
     const env = process.env;

     beforeEach(() => {
         jest.resetModules()
         process.env = { ...env }
     });
 
     afterEach(() => {
         process.env = env;
     });

    it('returns a valid application config loaded from an .env file',() => {

      let result = Config('app.name');
      expect(result).toBe("Elegant - The unit testing application.");
    });

    it('returns the base config when no .env file is loaded',() => {

        process.env.NEXT_PUBLIC_APP_NAME = undefined;
        let result = Config('app.name');

        expect(result).toBe("Elegant");
    });
});