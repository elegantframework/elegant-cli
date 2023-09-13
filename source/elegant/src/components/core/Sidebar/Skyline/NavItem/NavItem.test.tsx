import React from "react";
import renderer from 'react-test-renderer';
import NavItem from "./NavItem";

describe("Navigation item for the sidebar", () => {

    it('renders the nav item component as expected', () => {
        const navItem = renderer
        .create(
            <NavItem
                href="/hello/world"
                isActive={true}
                label="Hello World"
            />
        )
        .toJSON();
        expect(navItem).toMatchSnapshot();
    });
});