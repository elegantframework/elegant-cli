import React from "react";
import renderer from 'react-test-renderer';
import Logo from "./Logo";

describe("Logo component", () => {
    it('renders an SVG logo', () => {
        const logo = renderer
        .create(<Logo className="w-auto h-8" />)
        .toJSON();
        expect(logo).toMatchSnapshot();
    });
});