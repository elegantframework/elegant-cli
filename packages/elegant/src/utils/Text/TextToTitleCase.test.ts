import TextToTitleCase from "./TextToTitleCase";

describe('Text To Title Case', () => {
    it('changes a string to title case',() => {

      let result = TextToTitleCase("hello world, this is pretty awesome!");
      expect(result).toBe("Hello world, this is pretty awesome!");

      result = TextToTitleCase("HEY NOW, THIS IS COOL");
      expect(result).toBe("HEY NOW, THIS IS COOL");
    });

    it('handles a null string gracefully', () => {
      let result = TextToTitleCase("");
      expect(result).toBe("");
    });
});