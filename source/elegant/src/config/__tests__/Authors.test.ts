import { brandonOwens } from '../Authors'

describe('Authors Config', () => {
    it('returns a proper authors config',() => {

        let result = brandonOwens;

        expect(result).toStrictEqual(
            {
                "avatar": "/img.jpg", 
                "name": "Brandon Owens", 
                "twitter": "thebrandonowens"
            }
        );
    });
});