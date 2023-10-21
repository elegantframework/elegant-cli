import Seo from "./Seo";

describe('Seo component', () => {
  it('renders the base seo component properly', () => {
      const seo = Seo({
        title: "Elegant Test App",
      });
  
      expect(seo).toMatchSnapshot();
  });

  it('renders the non-base seo component properly', () => {
    const seo = Seo({
      title: "Elegant Test App numbero 2",
    });

    expect(seo).toMatchSnapshot();
  });
})