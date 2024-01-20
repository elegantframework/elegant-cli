import ValidateAuth from './Validate';

describe('Validate Auth utility method', () => {
    it('returns true when passed a "*"',() => {

      let result = ValidateAuth("*");

      expect(result).toBe(true);
    });

    it('returns false when not passed a "*"',() => {

      let result = ValidateAuth("");

      expect(result).toBe(false);
    });
});