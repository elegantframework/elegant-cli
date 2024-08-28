const init = require('../../packages/init');

let {
    readOutputFile,
  } = require('../io')({
    output: '../../../.test',
    input: 'src',
  });

describe('The Elegant CLI Tool', () => {
    it('generates an Elegant project', async () => {
        const result = await (`${init}`);
        expect(result !== null);

        // 5 second wait
        // setTimeout(async function(){
        //     expect(await readOutputFile('.env.example')).toContain('Elegant');
        // }, 5000);
    });
});