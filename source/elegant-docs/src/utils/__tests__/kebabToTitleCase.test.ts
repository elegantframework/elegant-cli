import TextToKebabCase from "../textToKebabCase";

describe('Kebab To Title Case', () => {
    it('changes a string to kebab case',() => {

      let result = TextToKebabCase("hello world");
      expect(result).toBe("Hello World");

      result = TextToKebabCase("hello world, this is a big big sentence.");
      expect(result).toBe("Hello World, This Is A Big Big Sentence.");
    });
});