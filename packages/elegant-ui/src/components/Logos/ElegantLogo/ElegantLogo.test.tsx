import React from "react";
import renderer from 'react-test-renderer';
import ElegantLogo from "./ElegantLogo";

describe("Elegant Logo component", () => {
    it('renders an SVG logo', () => {
        const logo = renderer
        .create(<ElegantLogo className="w-auto h-8" />)
        .toJSON();
        expect(logo).toMatchSnapshot();
    });
});