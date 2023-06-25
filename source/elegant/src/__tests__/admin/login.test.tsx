import Login from "@/pages/admin/login";

describe('The Admin Log In page', () => {
  it('renders properly', () => {
      const page = Login();
  
      expect(page).toMatchSnapshot();
  });
})