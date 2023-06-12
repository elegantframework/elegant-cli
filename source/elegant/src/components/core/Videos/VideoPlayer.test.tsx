import React from "react";
import renderer from 'react-test-renderer';
import VideoPlayer from "./VideoPlayer";

describe("Video Player component", () => {
    it('renders a video player component properly', () => {
        const Player = renderer
        .create(
            <VideoPlayer 
                title="Hello World"
                description="This is a unit test!"
                embed_url="https://www.youtube.com/embed/bS66QUBKljM"
                content_url="https://youtu.be/bS66QUBKljM"
            />
        )
        .toJSON();
        expect(Player).toMatchSnapshot();
    });
});