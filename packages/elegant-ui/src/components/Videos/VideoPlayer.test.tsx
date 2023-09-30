import React from "react";
import renderer from 'react-test-renderer';
import VideoPlayer from "./VideoPlayer";

describe("Video Player component", () => {
    it('renders a video player component properly', () => {
        const Player = renderer
        .create(
            <VideoPlayer 
                title="Hello World"
                videoId={'bS66QUBKljM'}
            />
        )
        .toJSON();
        expect(Player).toMatchSnapshot();
    });
});