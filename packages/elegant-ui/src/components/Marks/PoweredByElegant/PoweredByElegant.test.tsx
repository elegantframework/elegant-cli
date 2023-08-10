import React from "react";
import renderer from 'react-test-renderer';
import PoweredByElegant from "./PoweredByElegant";

describe("Powered By Elegant component", () => {
    it('renders a powered by Elegant component', () => {
        const element = renderer
        .create(<PoweredByElegant />)
        .toJSON();
        expect(element).toMatchSnapshot();
    });
});