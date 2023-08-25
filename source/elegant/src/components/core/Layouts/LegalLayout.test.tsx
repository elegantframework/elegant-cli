import React from "react";
import renderer from 'react-test-renderer';
import LegalLayout from "./LegalLayout";

describe("Legal Page layout component", () => {
    it('renders the proper html as expected', () => {
        const layout = renderer
        .create(
            <LegalLayout>
                <div>
                    Hello World!
                </div>
            </LegalLayout>
        )
        .toJSON();
        expect(layout).toMatchSnapshot();
    });
});