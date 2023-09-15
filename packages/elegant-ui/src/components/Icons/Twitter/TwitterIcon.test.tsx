import React from "react";
import renderer from 'react-test-renderer';
import TwitterIcon from './TwitterIcon';

describe("Twitter Icon component", () => {
    it('renders a Twitter SVG icon properly', () => {
        const icon = renderer
        .create(<TwitterIcon />)
        .toJSON();
        expect(icon).toMatchSnapshot();
    });
});