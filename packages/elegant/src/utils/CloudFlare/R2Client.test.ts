import R2Client from './R2Client';

describe('CloudFlare R2 Client', () => {
    it('returns a client object',() => {

      const result = R2Client(
        "",
        "",
        ""
      );

      expect(result).not.toBeNull();
    });
});