import React from "react";
import renderer from 'react-test-renderer';
import AnalyticsHead from "./AnalyticsHead";

describe("Analytics Head component", () => {
    it('renders an analytics head when an env var is passed in',() => {
        const head = renderer
            .create(<AnalyticsHead googleAnalyticsID="123456"/>)
            .toJSON();
        expect(head).toMatchSnapshot();
    });

    it('renders nothing when no env var is passed in ',() => {
        const head = renderer
            .create(<AnalyticsHead googleAnalyticsID=""/>)
            .toJSON();
        expect(head).toBeNull();
        expect(head).toMatchSnapshot();
    });
});