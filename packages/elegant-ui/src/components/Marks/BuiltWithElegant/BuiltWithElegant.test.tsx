import React from "react";
import renderer from 'react-test-renderer';
import BuiltWithElegant from "./BuiltWithElegant";

describe("Built with Elegant component", () => {
    it('renders a built with Elegant component', () => {
        const element = renderer
        .create(<BuiltWithElegant />)
        .toJSON();
        expect(element).toMatchSnapshot();
    });
});