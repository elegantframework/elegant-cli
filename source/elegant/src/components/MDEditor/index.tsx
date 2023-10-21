import { Editor, EditorContent } from '@tiptap/react';
import { useFormContext } from 'react-hook-form';
import MDEFloatingMenu from '../MDEFloatingMenu';
import MDEMenu from '../MDEMenu';

interface MDEditorProps {
  editor: Editor;
  id: string;
}

const MDEditor = ({ id, editor }: MDEditorProps) => {
  const {
    watch,
    formState: { errors }
  } = useFormContext();

  const watchContent = watch('content');

  console.log(watchContent)


  // @TODO: Watch the content?
  // When it changes, look at the image paths and replace them with the gh urls so the user sees their saved images instantly

  // gh url: https://raw.githubusercontent.com/elegantframework/elegantframework.com/v3.0-alpha/public/images/screenshot-2023-07-03-115238-IyND.png
  return (
    <>
      {editor && (
        <MDEMenu editor={editor} />
      )}
      {editor && (
        <MDEFloatingMenu editor={editor} />
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

export default MDEditor
