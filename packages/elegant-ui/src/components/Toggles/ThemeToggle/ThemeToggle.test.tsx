import React from "react";
import renderer from 'react-test-renderer';
import ThemeToggle from "./ThemeToggle";

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

describe("Theme toggle component", () => {
    it('renders a theme toggle component properly', () => {
        const toggle = renderer
        .create(<ThemeToggle />)
        .toJSON();
        expect(toggle).toMatchSnapshot();
    });
});