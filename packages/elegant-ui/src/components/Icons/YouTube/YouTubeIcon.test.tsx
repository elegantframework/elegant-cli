import React from "react";
import renderer from 'react-test-renderer';
import YouTubeIcon from './YouTubeIcon';

describe("YouTube Icon component", () => {
    it('renders a YouTube SVG icon properly', () => {
        const icon = renderer
        .create(<YouTubeIcon />)
        .toJSON();
        expect(icon).toMatchSnapshot();
    });
});