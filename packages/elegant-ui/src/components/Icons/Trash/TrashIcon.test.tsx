import React from "react";
import renderer from 'react-test-renderer';
import TrashIcon from "./TrashIcon";

describe("Trash Icon component", () => {
    it('renders a Trash SVG icon properly', () => {
        const icon = renderer
        .create(<TrashIcon />)
        .toJSON();
        expect(icon).toMatchSnapshot();
    });
});