import MetaTitle from "./MetaTitle";

describe('Meta Title', () => {
    it('returns a title cased string of the applications name for a meta title',() => {

      let result = MetaTitle("Hello", "This is a unit test!");

      expect(result).toBe("Hello - This Is A Unit Test!");
    });
});