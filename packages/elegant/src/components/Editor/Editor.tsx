'use client'
import { Editor as TipTapEditor, EditorContent } from '@tiptap/react';
import React, { useContext, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import ActionMenu from './Menus/ActionMenu';
import LinkMenu from './Menus/LinkMenu';
import { TableColumnMenu, TableRowMenu } from './Extensions/Table/menus';
import { ColumnsMenu } from './Extensions/MultiColumn/menus';
import ImageBlockMenu from './Extensions/ImageBlock/components/ImageBlockMenu';
import { TextMenu } from './Menus/TextMenu';
import { DocumentContext } from '../Admin/Pages/EditDocument';
import { cn } from "@/utils/utils";

export interface EditorProps {
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
  editor
}: EditorProps){
  const menuContainerRef = useRef(null);
  const { document, setDocument, setHasChanges, setHasCustomSlug, setErrors, errors } = useContext(DocumentContext);

  useEffect(() => {
    editor && editor.on('update', ({ editor }) => { 
      setHasChanges(true);

      if(errors.some(error => error.element === "editor")) {
        setErrors(errors.filter(e => e.element !== "editor"));
        console.log(errors.filter(e => e.element !== "editor"))
      }
    });
  }, [editor]);

  return (
    <>
        <div className={
            cn(
                "rounded-md w-full md:w-[calc(100%-256px)] mt-10 shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-indigo-600",
                errors.some(error => error.element === "editor")
                ? "ring-red-300" 
                : "ring-gray-300"
            )
        }>
          <div className="flex h-full" ref={menuContainerRef}>
            <div className="relative flex flex-col flex-1 h-full">
              <EditorContent 
                name="content" 
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
        </div>
        <p id="editor_error" className="mt-2 text-sm text-red-600">
            {errors.find(error => error.element === "editor")?.message}
        </p>
    </>
  )
};