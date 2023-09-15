import React from "react";
import renderer from 'react-test-renderer';
import InstagramIcon from './InstagramIcon';

describe("Instagram Icon component", () => {
    it('renders an Instagram SVG icon properly', () => {
        const icon = renderer
        .create(<InstagramIcon />)
        .toJSON();
        expect(icon).toMatchSnapshot();
    });
});