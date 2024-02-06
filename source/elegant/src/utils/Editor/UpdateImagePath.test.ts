import UpdateImagePath from "./UpdateImagePath";

describe('Update Image Path method', () => {
    it('returns the expected file path',() => {

      let result = UpdateImagePath('/api/admin/images/screenshot-2024-02-04-191324-czOT.png');

      expect(result).toBe("/images/screenshot-2024-02-04-191324-czOT.png"); 
    });

    it('returns the expected file path when passed html',() => {

        let result = UpdateImagePath('\
            \
            ## Welcome to Elegant!\
            \
            We are excited that you are here 😊\
            \
            \
            \
            <div class="my-8 shadow-xl"><img class="rounded-xl" src="/api/admin/images/screenrecorderproject28--1--AwNz.png" alt=""></div>\
        ');
  
        expect(result).toBe('\
            \
            ## Welcome to Elegant!\
            \
            We are excited that you are here 😊\
            \
            \
            \
            <div class="my-8 shadow-xl"><img class="rounded-xl" src="/images/screenrecorderproject28--1--AwNz.png" alt=""></div>\
        '); 
    });

    it('returns the expected file path when passed markdown',() => {

        let result = UpdateImagePath('\
            \
            ## Welcome to Elegant!\
            \
            We are excited that you are here 😊\
            \
            \
            \
            ![null](/api/admin/images/screenrecorderproject28--1--AwNz.png)\
        ');
  
        expect(result).toBe('\
            \
            ## Welcome to Elegant!\
            \
            We are excited that you are here 😊\
            \
            \
            \
            ![null](/images/screenrecorderproject28--1--AwNz.png)\
        '); 
    });
});