import TrademarkPolicyPage from "@/pages/legal/trademark-policy";

describe('The trademark policy page', () => {
  it('renders the page html as expected', () => {
      const page = TrademarkPolicyPage();
  
      expect(page).toMatchSnapshot();
  });
})