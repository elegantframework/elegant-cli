import React from "react";
import renderer from 'react-test-renderer';
import AnalyticsBody from "./AnalyticsBody";

describe("Analytics Body component", () => {
    it('renders an analytics body when an env var is passed in',() => {
        const body = renderer
            .create(<AnalyticsBody googleAnalyticsID="123456"/>)
            .toJSON();
        expect(body).toMatchSnapshot();
    });

    it('renders nothing when no env var is passed in ',() => {
        const body = renderer
            .create(<AnalyticsBody googleAnalyticsID=""/>)
            .toJSON();
        expect(body).toBeNull();
        expect(body).toMatchSnapshot();
    });
});