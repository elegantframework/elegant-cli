import React from "react";
import renderer from 'react-test-renderer';
import SunIcon from "./SunIcon";

describe("Sun Icon component", () => {
    it('renders a sun SVG icon properly', () => {
        const icon = renderer
        .create(<SunIcon />)
        .toJSON();
        expect(icon).toMatchSnapshot();
    });
});