import React from "react";
import renderer from 'react-test-renderer';
import DocsFooter from "./DocsFooter";

describe("Documentation Footer component", () => {
    it('renders the documentation footer properly', () => {
        const heading = renderer
        .create(
            <DocsFooter>
            </DocsFooter>
        )
        .toJSON();
        expect(heading).toMatchSnapshot();
    });
});