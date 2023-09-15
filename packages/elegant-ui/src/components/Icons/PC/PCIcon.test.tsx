import React from "react";
import renderer from 'react-test-renderer';
import PCIcon from "./PCIcon";

describe("PC Icon component", () => {
    it('renders a PC SVG icon properly', () => {
        const icon = renderer
        .create(<PCIcon />)
        .toJSON();
        expect(icon).toMatchSnapshot();
    });
});