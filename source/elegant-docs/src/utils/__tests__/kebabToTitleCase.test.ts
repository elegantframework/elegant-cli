import textToKebabCase from "../textToKebabCase";

describe('Kebab To Title Case', () => {
    it('changes a string to kebab case',() => {

      let result = textToKebabCase("hello world");
      expect(result).toBe("Hello World");

      result = textToKebabCase("hello world, this is a big big sentence.");
      expect(result).toBe("Hello World, This Is A Big Big Sentence.");
    });
});