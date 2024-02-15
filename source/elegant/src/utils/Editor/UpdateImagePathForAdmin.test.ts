import UpdateImagePathForAdmin from './UpdateImagePathForAdmin';

describe('Update Image Path for Admin method', () => {
    it('returns the expected file path',() => {

      let result = UpdateImagePathForAdmin('/images/screenshot-2024-02-04-191324-czOT.png');

      expect(result).toBe("/api/admin/images/screenshot-2024-02-04-191324-czOT.png"); 
    });

    it('returns the expected file path when passed html',() => {

        let result = UpdateImagePathForAdmin('\
            \
            ## Welcome to Elegant!\
            \
            We are excited that you are here 😊\
            \
            \
            \
            <div class="my-8 shadow-xl"><img class="rounded-xl" src="/images/screenrecorderproject28--1--AwNz.png" alt=""></div>\
        ');
  
        expect(result).toBe('\
            \
            ## Welcome to Elegant!\
            \
            We are excited that you are here 😊\
            \
            \
            \
            <div class="my-8 shadow-xl"><img class="rounded-xl" src="/api/admin/images/screenrecorderproject28--1--AwNz.png" alt=""></div>\
        '); 

        result = UpdateImagePathForAdmin("\n<h1>Welcome to Elegant! </h1><p>We are excited that you are here</p><p><div class=\"my-8 shadow-xl\"><img class=\"rounded-xl\" src=\"/images/screenrecorderproject28--1--AwNz.png\" alt=\"\"></div></p>");

        expect(result).toContain("<h1>Welcome to Elegant! </h1><p>We are excited that you are here</p><p><div class=\"my-8 shadow-xl\"><img class=\"rounded-xl\" src=\"/api/admin/images/screenrecorderproject28--1--AwNz.png\" alt=\"\"></div></p>");
    });

    it('returns the expected file path when passed markdown',() => {

        let result = UpdateImagePathForAdmin('\
            \
            ## Welcome to Elegant!\
            \
            We are excited that you are here 😊\
            \
            \
            \
            ![null](/images/screenrecorderproject28--1--AwNz.png)\
        ');
  
        expect(result).toBe('\
            \
            ## Welcome to Elegant!\
            \
            We are excited that you are here 😊\
            \
            \
            \
            ![null](/api/admin/images/screenrecorderproject28--1--AwNz.png)\
        '); 
    });
});