import Seo from "./Seo";

describe('Seo component', () => {
  it('renders the base seo component properly', () => {
      const seo = Seo({
        title: "Elegant Test App",
        base: true
      });
  
      expect(seo).toMatchSnapshot();
  });

  it('renders the non-base seo component properly', () => {
    const seo = Seo({
      title: "Elegant Test App numbero 2",
      base: false
    });

    expect(seo).toMatchSnapshot();
  });
})