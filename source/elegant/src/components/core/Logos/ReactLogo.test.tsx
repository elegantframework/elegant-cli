import React from "react";
import renderer from 'react-test-renderer';
import ReactLogo from "./ReactLogo";

describe("React.js Logo component", () => {
    it('renders an SVG logo', () => {
        const logo = renderer
        .create(<ReactLogo className="w-auto h-8" />)
        .toJSON();
        expect(logo).toMatchSnapshot();
    });
});