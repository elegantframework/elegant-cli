import MergeMarkdownData from './MergeMarkdownData';

describe('Merge Markdown Data method', () => {
    it('returns the file as expected',() => {

      let result = MergeMarkdownData({
        title: 'Welcome',
        status: 'published',
        author: {
            name: 'Brandon Owens',
            picture: 'https://avatars.githubusercontent.com/u/10189130?v=4'
        },
        slug: 'welcome',
        description: 'Welcome to Elegant.',
        coverImage: '/images/social-card-large-EyMT.jpg',
        content: '\
            \
            ## Welcome to Elegant!\
            \
            We are excited that you are here 😊\
            \
            \
            \
            <div class="my-8 shadow-xl"><img class="rounded-xl" src="/api/admin/images/screenrecorderproject28--1--AwNz.png" alt=""></div>\
        '
      });

      expect(result).toMatchSnapshot(); 
    });
});