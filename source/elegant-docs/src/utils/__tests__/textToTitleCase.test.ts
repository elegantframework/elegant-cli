import textToTitleCase from "../../utils/textToTitleCase";

describe('Text To Title Case', () => {
    it('changes a string to title case',() => {

      let result = textToTitleCase("hello world, this is pretty awesome!");
      expect(result).toBe("Hello world, this is pretty awesome!");

      result = textToTitleCase("HEY NOW, THIS IS COOL");
      expect(result).toBe("HEY NOW, THIS IS COOL");
    });
});