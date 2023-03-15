const fs = require('fs');
const exec = require('child_process');
const init = require('./../../source/init');

describe('The Elegant CLI Tool', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(1 + 2).toBe(3);
    });

    it('generates a docs project', async (done) => {
        const script = init;
        await exec(script, () => {
          const result = fs.readdirSync('/test')
          expect(result != null);
          done();
        })
    });
});