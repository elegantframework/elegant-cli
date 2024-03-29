import { GetPageList, ShowNextButton } from './Pagintation';

describe('Show Next Button utility method', () => {
    it('returns true',() => {
      let result = ShowNextButton(
        1,
        10,
        6
      );

      expect(result).toBeTruthy;
    });

    it('returns false',() => {
        let result = ShowNextButton(
          2,
          10,
          6
        );
  
        expect(result).toBeFalsy;
      });
});

describe('Get Page List utility method', () => {
    it('returns a list as expected',() => {
      let result = GetPageList(10, 2);

      expect(result).toStrictEqual(["1", "2", "3", "4", "5"]);
    });
});