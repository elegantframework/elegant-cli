import React from "react";
import renderer from 'react-test-renderer';
import LinkedInIcon from './LinkedInIcon';

describe("LinkedIn Icon component", () => {
    it('renders a LinkedIn SVG icon properly', () => {
        const icon = renderer
        .create(<LinkedInIcon />)
        .toJSON();
        expect(icon).toMatchSnapshot();
    });
});