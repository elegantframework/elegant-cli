import React from "react";
import renderer from 'react-test-renderer';
import SplashFooter from "./SplashFooter";

describe("Splash page footer component", () => {
    it('renders a splash page footer properly', () => {
        const footer = renderer
        .create(<SplashFooter navigation={[
            {
                title: "Community",
                links: [
                    { title: 'Indie Hackers', href: 'https://www.indiehackers.com/product/elegant-framework' },
                    { title: 'Twitter', href: 'https://twitter.com/thebrandonowens' },
                    { title: 'Reddit', href: 'https://www.reddit.com/r/elegantframework/' }
                ]
              },
              {
                  title: "Features",
                  links: [
                      { title: 'Theme Customization', href: '/docs/theme/' },
                      { title: 'Easy Configuration', href: '/docs/configuration/' },
                      { title: 'Affordable Hosting', href: '/docs/deployment/' },
                      { title: 'Safe & Fast', href: '/blog/2023-04-20-the-future-is-markdown'}
                  ]
              },
              {
                  title: "Services",
                  links: [
                      { title: 'Google Analytics', href: '/docs/google-analytics/' },
                  ]
              }
        ]}/>)
        .toJSON();
        expect(footer).toMatchSnapshot();
    });
});