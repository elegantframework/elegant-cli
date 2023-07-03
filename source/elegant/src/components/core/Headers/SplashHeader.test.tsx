import React from "react";
import renderer from 'react-test-renderer';
import SplashHeader from "./SplashHeader";
import ReactDOM from "react-dom";

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

describe("Splash Header component", () => {
    it('renders a splash header component properly', () => {
        const header = renderer
        .create(
            <SplashHeader
                beams={false}
                gitHubUrl="hello.com"
                appName="Jest Test"
            />
        )
        .toJSON();
        expect(header).toMatchSnapshot();
    });
});