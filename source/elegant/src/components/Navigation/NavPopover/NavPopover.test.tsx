import React from "react";
import renderer from 'react-test-renderer';
import ReactDOM from "react-dom";
import NavPopover from "./NavPopover";

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
});

// react portal fix
// @ts-ignore
ReactDOM.createPortal = node => node;

describe("Nav popover component", () => {
    it('renders a nav popover component properly', () => {
        const popover = renderer
        .create(
            <NavPopover 
                navigationItems={[
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
        expect(popover).toMatchSnapshot();
    });

    it('renders a nav popover component with no navigation elements properly', () => {
        const popover = renderer
        .create(<NavPopover />)
        .toJSON();
        expect(popover).toMatchSnapshot();
    });
});