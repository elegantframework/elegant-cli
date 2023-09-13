import React from "react";
import renderer from 'react-test-renderer';
import GitHubIcon from "./GitHubIcon";

describe("GitHub Icon component", () => {
    it('renders a GitHug SVG icon properly', () => {
        const icon = renderer
        .create(<GitHubIcon />)
        .toJSON();
        expect(icon).toMatchSnapshot();
    });
});