import { Editor as TipTapEditor, EditorContent } from '@tiptap/react';
import { useFormContext } from 'react-hook-form';
import Menu from '../Menu/Menu';
import FloatingMenu from '../FloatingMenu/FloatingMenu';

interface Props {
    /**
     * The tiptap powered editor.
     */
    editor: TipTapEditor;
    id: string;
}

/**
 * The text editor for the admin portal.
 * @returns An html text editor for creating amazing content.
 */
export default function Editor({ 
    id, 
    editor 
}: Props) {
  const {
    watch,
    formState: { errors }
  } = useFormContext()

  const watchContent = watch('content')

  return (
    <>
      {editor && (
        <Menu editor={editor} />
      )}
      {editor && (
        <FloatingMenu editor={editor} />
      )}
      <EditorContent 
        name="content" 
        value={watchContent} 
        editor={editor} 
      />
      <div className="mt-1">
        {errors[id]?.message && (
          <span className="text-sm text-red-500">
            {errors[id]?.message?.toString()}
          </span>
        )}
      </div>
    </>
  )
}