import React from "react";
import renderer from 'react-test-renderer';
import MoonIcon from './MoonIcon';

describe("Moon Icon component", () => {
    it('renders a moon SVG icon properly', () => {
        const icon = renderer
        .create(<MoonIcon />)
        .toJSON();
        expect(icon).toMatchSnapshot();
    });
});