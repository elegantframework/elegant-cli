import React from "react";
import VersionSelector from "./VersionSelector";
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';

describe("Version Selector component", () => {
    it('renders a version selector component as expected', () => {
        global.ResizeObserver = ResizeObserver;

        render(
            <VersionSelector 
                version="1.1.1"
                pastVersions={[
                    {label: "2.1.1", href: "v2.test.com"}
                ]}
            /> 
        );

        expect(
            screen.getByText('v1.1.1')
        ).toBeInTheDocument();
    });

    it("shows the dropdown when clicked", () => {
        global.ResizeObserver = ResizeObserver;

        render(
            <VersionSelector 
                version="1.1.1"
                pastVersions={[
                    {label: "2.1.1", href: "v2.test.com"}
                ]}
            /> 
        );

        fireEvent.click(screen.getByText("v1.1.1"));

        expect(
            screen.getByText('v2.1.1')
        ).toBeInTheDocument();
    })
});