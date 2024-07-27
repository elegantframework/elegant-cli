import React from "react";
import renderer from 'react-test-renderer';
import { Editor } from '@tiptap/react';
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import { Plus } from "lucide-react";

describe('Editor Toolbar component', () => {
    it('renders the toolbar as expected', () => {
        const editor = new Editor({
            extensions: [StarterKit]
        });

        const menu = renderer
        .create(
            <Toolbar.Button onClick={() => {
                console.log('hello world!')
            }}>
                <Plus className='w-4 h-4' strokeWidth={2.5}/>
            </Toolbar.Button>
        )
        .toJSON();
        expect(menu).toMatchSnapshot();
    });
});