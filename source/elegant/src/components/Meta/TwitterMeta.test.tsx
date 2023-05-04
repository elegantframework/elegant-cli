import React from "react";
import renderer from 'react-test-renderer';
import TwitterMeta from "./TwitterMeta";

describe("Twitter meta card component", () => {
    it('renders a twitter creator card if a creator is provided',() => {
        const card = renderer
            .create(<TwitterMeta twitterHandle="@test"/>)
            .toJSON();
        expect(card).toMatchSnapshot();
    });

    it('renders nothing if a handle is not provided',() => {
        const card = renderer
            .create(<TwitterMeta twitterHandle=""/>)
            .toJSON();
        expect(card).toBeNull();
        expect(card).toMatchSnapshot();
    });
});