import React from "react";
import renderer from 'react-test-renderer';
import Nav from "./Nav";
import { documentationNav } from "@/config/Navigation";

describe("Navigation for the sidebar", () => {

    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    useRouter.mockImplementation(() => ({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
        push: jest.fn(),
        events: {
        on: jest.fn(),
        off: jest.fn()
        },
        beforePopState: jest.fn(() => null),
        prefetch: jest.fn(() => null)
    }));

    it('renders the navigation section as expected', () => {
        const nav = renderer
        .create(
            <Nav nav={documentationNav}/>
        )
        .toJSON();
        expect(nav).toMatchSnapshot();
    });
});