import React from "react";
import renderer from 'react-test-renderer';
import { NewsletterForm } from "./NewsletterForm";

describe("Newsletter Signup Form", () => {
    it('handles an action', () => {
        const form = renderer
        .create(<NewsletterForm action={() => {console.log('hello world')}}/>)
        .toJSON();
        expect(form).toMatchSnapshot();
    });
});