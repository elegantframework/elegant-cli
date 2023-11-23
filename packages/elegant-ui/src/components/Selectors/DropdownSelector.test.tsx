import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DropdownSelector from "./DropdownSelector";

describe("Dropdown Selector component", () => {
    it('renders a dropdown selector component as expected', () => {
        render(
            <DropdownSelector 
                selected="Options"
            />
        );

        expect(
            screen.getByText('Options')
        ).toBeInTheDocument();
    });

    // it("shows the dropdown when clicked", () => {
    //     render(
    //         <VersionSelector 
    //             version="1.1.1"
    //             pastVersions={[
    //                 {label: "2.1.1", href: "v2.test.com"}
    //             ]}
    //         /> 
    //     );

    //     fireEvent.click(screen.getByText("v1.1.1"));

    //     expect(
    //         screen.getByText('v2.1.1')
    //     ).toBeInTheDocument();
    // })
});