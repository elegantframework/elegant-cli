import { Editor as TipTapEditor, EditorContent, PureEditorContent } from '@tiptap/react';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import ActionMenu from './ActionMenu/ActionMenu';

interface Props {
  /**
   * 
   */
  id: string;
  /**
   * The TipTap Editor.
   */
  editor: TipTapEditor;
}

/**
 * The rich-text content editor.
 * @returns A detailed content editor powered by TipTap.
 */
export default function Editor({
    id, 
    editor
}: Props){
  const {
    watch,
    formState: { errors }
  } = useFormContext();

  const menuContainerRef = useRef(null);
  const editorRef = useRef<PureEditorContent | null>(null);

  const watchContent = watch('content');

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex flex-col flex-1 h-full overflow-hidden">
        <EditorContent 
          name="content" 
          value={watchContent} 
          editor={editor} 
          ref={editorRef}
          className="flex-1 overflow-y-auto"
        />
        <ActionMenu editor={editor} />
        <div className="mt-1">
          {errors[id]?.message && (
            <span className="text-sm text-red-500">
              {errors[id]?.message?.toString()}
            </span>
          )}
        </div>
      </div>
    </div>
  )
};