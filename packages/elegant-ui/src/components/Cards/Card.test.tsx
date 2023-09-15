import React from "react";
import renderer from 'react-test-renderer';
import Card from "./Card";

describe("Card component", () => {
    it('renders a card properly', () => {
        const card = renderer
        .create(
            <Card>
                <div>
                    This is a test
                </div>
            </Card>
        )
        .toJSON();
        expect(card).toMatchSnapshot();
    });
});