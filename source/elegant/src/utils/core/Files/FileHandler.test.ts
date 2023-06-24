import GetSavedFilePath from './FileHandler';

describe('The file handler utility method', () => {

     // we need to mock out process.env functionality to test when an .env file isn't loaded
     const env = process.env;

     beforeEach(() => {
         jest.resetModules()
         process.env = { ...env }
     });
 
     afterEach(() => {
         process.env = env;
     });

    it('return a valid file path during core Elegant development',() => {

      let result = GetSavedFilePath();
      expect(result).toBe("source/elegant/public/");
    });

    it('returns a valid file path when Elegant is installed normally.',() => {

        process.env.NEXT_PUBLIC_CMS_ASSET_PATH = undefined;

        let result = GetSavedFilePath();
        expect(result).toBe("public/");
    });
});