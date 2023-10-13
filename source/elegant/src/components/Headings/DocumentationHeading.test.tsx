import React from "react";
import renderer from 'react-test-renderer';
import { DocumentationHeading } from "./DocumentationHeading";

describe("Documentation Heading component", () => {
    it('renders the documentation heading properly', () => {
        const heading = renderer
        .create(
            <DocumentationHeading 
                title="Unit Test"
                section="Hello world"  
            />
        )
        .toJSON();
        expect(heading).toMatchSnapshot();
    });
});