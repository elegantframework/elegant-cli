import { comparePasswords, hashPassword } from "./Bcrypt";

describe('The Bcrypt package', () => {
    it('hashes a password and successfully compares it',() => {

      let hash = hashPassword("hello");

      let result = comparePasswords("hello", hash);

      expect(result).toBeTruthy();
    });
});