import { comparePasswords, hashPassword } from "./Bcrypt";

describe('The Bcrypt package', () => {
    it('hashes a password and successfully compares it',() => {

      const hash = hashPassword("hello");

      const result = comparePasswords("hello", hash);

      expect(result).toBeTruthy();
    });
});