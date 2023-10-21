import React from "react";
import renderer from 'react-test-renderer';
import DiscordIcon from './DiscordIcon';

describe("Discord Icon component", () => {
    it('renders a Discord SVG icon properly', () => {
        const icon = renderer
        .create(<DiscordIcon />)
        .toJSON();
        expect(icon).toMatchSnapshot();
    });
});