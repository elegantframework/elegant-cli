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
                videoId={'bS66QUBKljM'}
                uploadDate="2018-02-05T08:00:00+08:00"
            />
        )
        .toJSON();
        expect(Player).toMatchSnapshot();
    });
});