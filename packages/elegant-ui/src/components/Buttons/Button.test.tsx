import React from "react";
import renderer from 'react-test-renderer';
import Button from './Button';

describe("Button component", () => {
    it('renders the button html as expected', () => {
        const element = renderer
        .create(
            <Button text="Hello World"/>
        )
        .toJSON();
        expect(element).toMatchSnapshot();
    });
});