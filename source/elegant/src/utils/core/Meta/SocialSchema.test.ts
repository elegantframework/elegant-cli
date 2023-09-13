import SocialSchema from './SocialSchema';

describe('Social Schema', () => {
    it('returns the social schema object with data',() => {

      let result = SocialSchema();

      expect(result).toMatchSnapshot();
    });
});