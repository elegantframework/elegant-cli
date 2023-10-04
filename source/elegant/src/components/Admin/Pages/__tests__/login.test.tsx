import Login from "@/components/Admin/Pages/login";

describe('The Admin Log In page', () => {
  it('renders properly', () => {
      const page = Login();
  
      expect(page).toMatchSnapshot();
  });
})