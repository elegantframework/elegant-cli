'use client'
import { Editor as TipTapEditor, EditorContent } from '@tiptap/react';
import { useContext, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import ActionMenu from './Menus/ActionMenu';
import LinkMenu from './Menus/LinkMenu';
import { TableColumnMenu, TableRowMenu } from './Extensions/Table/menus';
import { ColumnsMenu } from './Extensions/MultiColumn/menus';
import ImageBlockMenu from './Extensions/ImageBlock/components/ImageBlockMenu';
import { TextMenu } from './Menus/TextMenu';
import React from 'react';
import { DocumentContext } from '../Admin/Pages/EditDocument';

interface EditorProps {
  /**
   * 
   */
  id: string;
  /**
   * The TipTap Editor.
   */
  editor: TipTapEditor;
};

/**
 * The rich-text content editor.
 * @returns A detailed content editor powered by TipTap.
 */
export default function Editor({
    id, 
    editor
}: EditorProps){
  // const {
  //   watch,
  //   formState: { errors }
  // } = useFormContext();

  const { document, hasChanges, setHasChanges } = useContext(DocumentContext);
  const menuContainerRef = useRef(null);
  // const watchContent = watch('content');

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex flex-col flex-1 h-full">
        <EditorContent 
          name="content" 
          // value={document.content} 
          editor={editor} 
          className="flex-1 overflow-y-auto px-4 pt-6 pb-20"
        />
        {/* {editor && (<ActionMenu editor={editor} />)} */}
        {editor && (<LinkMenu editor={editor} appendTo={menuContainerRef} />)}
        {editor && (<TextMenu editor={editor} />)}
        {editor && (<ColumnsMenu editor={editor} appendTo={menuContainerRef} />)}
        {editor && (<TableRowMenu editor={editor} appendTo={menuContainerRef} />)}
        {editor && (<TableColumnMenu editor={editor} appendTo={menuContainerRef} />)}
        {editor && (<ImageBlockMenu editor={editor} appendTo={menuContainerRef} />)}
        {/* <div className="mt-1">
          {errors[id]?.message && (
            <span className="text-sm text-red-500">
              {errors[id]?.message?.toString()}
            </span>
          )}
        </div> */}
      </div>
    </div>
  )
};