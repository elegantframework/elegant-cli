import SimpleSearch from './SimpleSearch';
import { SamplePost } from './d8a';

describe('The Simple Search method', () => {
    it('returns a post as expected', () => {
        let result = SimpleSearch(
            "This is a test",
            [
                SamplePost()
            ]
        );
        
        expect(result.length).toBe(1);
    });

    it('returns a post as expected using tags', () => {
        let result = SimpleSearch(
            "Hello World",
            [
                SamplePost()
            ]
        );
        
        expect(result.length).toBe(1);
    });

    it('returns nothing', () => {
        let result = SimpleSearch(
            "Blah blah",
            [
                SamplePost()
            ]
        );
    
        expect(result.length).toBe(0);
    });

    it('does not break with no tags', () => {
        let post = SamplePost();

        post.tags = undefined;

        let result = SimpleSearch(
            "Blah blah",
            [
                post
            ]
        );
    
        expect(result.length).toBe(0);
    });
});