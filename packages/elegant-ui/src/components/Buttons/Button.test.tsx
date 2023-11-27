import React from "react";
import renderer from 'react-test-renderer';
import Button from './Button';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe("Button component", () => {
    it('renders the button html as expected', () => {
        const element = renderer
        .create(
            <Button text="Hello World"/>
        )
        .toJSON();
        expect(element).toMatchSnapshot();
    });

    it('displays the button text as expected', () => {
        render(
            <Button text="Hello World"/>
        );

        expect(
            screen.getByText('Hello World')
        ).toBeInTheDocument();
    });

    it('renders a link when passed an href', () => {
        render(
            <Button text="Hello World" href="example.com"/>
        );

        expect(
            screen.getByText('Hello World')
        ).toBeInTheDocument();
    });

    it('renders the secondary variant as expected', () => {
        const element = renderer
        .create(
            <Button text="Hello World" variant="secondary"/>
        )
        .toJSON();
        expect(element).toMatchSnapshot();
    }) 
});