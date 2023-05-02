import React from "react";
import renderer from 'react-test-renderer';
import VersionSwitcher from "./VersionSwitcher";

describe("Version Switcher header component", () => {
    it('renders a version switcher component', () => {
        const footer = renderer
        .create(<VersionSwitcher />)
        .toJSON();
        expect(footer).toMatchSnapshot();
    });
});