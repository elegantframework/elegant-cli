import React from "react";
import renderer from 'react-test-renderer';
import MDXLogo from "./MDXLogo";

describe("MDX-JS Logo component", () => {
    it('renders an SVG logo', () => {
        const logo = renderer
        .create(<MDXLogo className="w-auto h-8" />)
        .toJSON();
        expect(logo).toMatchSnapshot();
    });
});