import ErrorPage from './../404';

describe('The 404 error page', () => {
  it('renders properly', () => {
      const page = ErrorPage();
  
      expect(page).toMatchSnapshot();
  });
})