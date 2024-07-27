import React from "react";
import renderer from 'react-test-renderer';
import ActionMenu from "./ActionMenu";
import { Editor } from '@tiptap/react';
import StarterKit from "@tiptap/starter-kit";

describe('Action Menu component', () => {
    it('renders the action menu as expected', () => {
        const editor = new Editor({
            extensions: [StarterKit]
        });

        const menu = renderer
        .create(
            <ActionMenu editor={editor}/>
        )
        .toJSON();
        expect(menu).toMatchSnapshot();
    });
});