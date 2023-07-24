import React from "react";
import renderer from 'react-test-renderer';
import ReactDOM from "react-dom";
import AdminHeader from "./AdminHeader";

describe("Admin Header component", () => {
    it('renders an admin header properly', () => {
        const header = renderer
        .create(
            <AdminHeader 
                name="Hello World"
                email="test@example.com"
                image=""
                status="authenticated"
                toggleSidebar={() => {}}
            />
        )
        .toJSON();
        expect(header).toMatchSnapshot();
    });
});