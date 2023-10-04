import React from "react";
import renderer from 'react-test-renderer';
import TableOfContents from "./TableOfContents";

describe("Table of contents", () => {
    it('renders the table of contents properly', () => {
        const footer = renderer
        .create(
            <TableOfContents 
                tableOfContents={[]}
                currentSection="Hello World"
            />
        )
        .toJSON();
        expect(footer).toMatchSnapshot();
    });
});