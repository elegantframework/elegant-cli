import React from "react";
import renderer from 'react-test-renderer';
import FacebookIcon from './FacebookIcon';

describe("Facebook Icon component", () => {
    it('renders a Facebook SVG icon properly', () => {
        const icon = renderer
        .create(<FacebookIcon />)
        .toJSON();
        expect(icon).toMatchSnapshot();
    });
});