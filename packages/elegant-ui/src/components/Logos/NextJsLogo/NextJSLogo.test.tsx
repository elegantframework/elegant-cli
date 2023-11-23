import React from "react";
import renderer from 'react-test-renderer';
import NextJsLogo from "./NextJsLogo";

describe("Next.js Logo component", () => {
    it('renders an SVG logo', () => {
        const logo = renderer
        .create(<NextJsLogo className="w-auto h-8" />)
        .toJSON();
        expect(logo).toMatchSnapshot();
    });
});