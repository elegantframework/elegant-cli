import React from "react";
import renderer from 'react-test-renderer';
import ThreeColumnFooter from "./ThreeColumnFooter";

describe("Three column footer component", () => {
    it('renders the three column footer as expected', () => {
        const footer = renderer
        .create(<ThreeColumnFooter 
            column1={[
                {
                  title: "Community",
                  links: [
                      { title: 'Indie Hackers', href: 'https://www.indiehackers.com/product/elegant-framework', external: true },
                      { title: 'Twitter', href: 'https://twitter.com/thebrandonowens', external: true },
                      { title: 'Reddit', href: 'https://www.reddit.com/r/elegantframework/', external: true }
                  ]
                },
                {
                  title: "Features",
                  links: [
                      { title: 'Theme Customization', href: 'https://elegantframework.com/docs/theme/' },
                      { title: 'Easy Configuration', href: 'https://elegantframework.com/docs/configuration/' },
                      { title: 'Affordable Hosting', href: 'https://elegantframework.com/docs/deployment/' },
                      { title: 'Safe & Fast', href: 'https://elegantframework.com/blog/2023-04-20-the-future-is-markdown'}
                  ]
                },
                {
                  title: "Services",
                  links: [
                      { title: 'Google Analytics', href: 'https://elegantframework.com/docs/google-analytics/' },
                  ]
                },
                {
                  title: "Resources",
                  links: [
                      { title: 'Website Design Services', href: 'https://elegantframework.com/experts' },
                  ]
                }  
              ]}
            column2={[
                {
                  title: "Navigation 2",
                  links: [
                      { title: 'Theme Customization', href: 'https://elegantframework.com/docs/theme/' },
                      { title: 'Easy Configuration', href: 'https://elegantframework.com/docs/configuration/' },
                      { title: 'Affordable Hosting', href: 'https://elegantframework.com/docs/deployment/' },
                      { title: 'Safe & Fast', href: 'https://elegantframework.com/blog/2023-04-20-the-future-is-markdown'},
                      { title: 'Theme Customization', href: 'https://elegantframework.com/docs/theme/' },
                      { title: 'Easy Configuration', href: 'https://elegantframework.com/docs/configuration/' },
                      { title: 'Affordable Hosting', href: 'https://elegantframework.com/docs/deployment/' },
                      { title: 'Safe & Fast', href: 'https://elegantframework.com/blog/2023-04-20-the-future-is-markdown'},
                      { title: 'Theme Customization', href: 'https://elegantframework.com/docs/theme/' },
                      { title: 'Easy Configuration', href: 'https://elegantframework.com/docs/configuration/' },
                      { title: 'Affordable Hosting', href: 'https://elegantframework.com/docs/deployment/' },
                      { title: 'Safe & Fast', href: 'https://elegantframework.com/blog/2023-04-20-the-future-is-markdown'}
                  ]
                },
              ]}
            column3={[
                {
                  title: "Navigation 3",
                  links: [
                      { title: 'Theme Customization', href: 'https://elegantframework.com/docs/theme/' },
                      { title: 'Easy Configuration', href: 'https://elegantframework.com/docs/configuration/' },
                      { title: 'Affordable Hosting', href: 'https://elegantframework.com/docs/deployment/' },
                      { title: 'Safe & Fast', href: 'https://elegantframework.com/blog/2023-04-20-the-future-is-markdown'}
                  ]
                },
                {
                  title: "Legal",
                  links: [
                      { title: 'Trademark Policy', href: 'https://elegantframework.com/legal/trademark-policy/'},
                      { title: 'Brand Assets', href: 'https://elegantframework.com/legal/brand/'},
                  ]
                },
              ]}
            copyright="Elegant, Inc. Unit Test"
        />)
        .toJSON();
        expect(footer).toMatchSnapshot();
    });
});