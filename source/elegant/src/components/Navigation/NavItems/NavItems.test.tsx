import React from "react";
import renderer from 'react-test-renderer';
import NavItems from "./NavItems";

describe("Nav Item component", () => {

    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    }));

    it('renders the nav items component properly', () => {
        const navItem = renderer
        .create(
            <NavItems 
                navItems={[
                    {
                        href: "/docs/installation",
                        path: "/docs/",
                        label: "Docs",        
                    },
                    {
                        href: "/blog",
                        path: "/blog",
                        label: "Blog",        
                    }
                ]}
            />
        )
        .toJSON();
        expect(navItem).toMatchSnapshot();
    });

    it('renders the nav items component properly with no nav items', () => {
        const navItem = renderer
        .create(
            <NavItems 
                navItems={[]}
            />
        )
        .toJSON();
        expect(navItem).toMatchSnapshot();
    });
});