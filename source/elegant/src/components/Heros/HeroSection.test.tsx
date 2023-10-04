import React from "react";
import renderer from 'react-test-renderer';
import HeroSection from "./HeroSection";

describe("Hero Section component", () => {
    it('renders a hero section component properly', () => {
        const header = renderer
        .create(
            <HeroSection 
                heading="This is a Unit Test"
            >
                <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
                    Hello World!
                </p>
            </HeroSection>
        )
        .toJSON();
        expect(header).toMatchSnapshot();
    });
});