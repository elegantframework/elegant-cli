import React from "react";
import renderer from 'react-test-renderer';
import TailwindCSSLogo from "./TailwindCSSLogo";

describe("Tailwind CSS Logo component", () => {
    it('renders an SVG logo', () => {
        const logo = renderer
        .create(<TailwindCSSLogo className="w-auto h-8" />)
        .toJSON();
        expect(logo).toMatchSnapshot();
    });
});