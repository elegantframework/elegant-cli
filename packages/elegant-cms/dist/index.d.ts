import { Editor as Editor$1 } from '@tiptap/react';
import React from 'react';
import { ResolvingMetadata, Metadata } from 'next';

interface EditorProps {
    /**
     *
     */
    id: string;
    /**
     * The TipTap Editor.
     */
    editor: Editor$1;
}
/**
 * The rich-text content editor.
 * @returns A detailed content editor powered by TipTap.
 */
declare function Editor({ id, editor }: EditorProps): React.JSX.Element;

declare const useEditor: ({ ...rhfMethods }: {
    [x: string]: any;
}) => {
    editor: Editor$1;
};

interface Props {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}
declare function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata>;

export { Editor, generateMetadata, useEditor };
