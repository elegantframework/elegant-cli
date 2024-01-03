import Placeholder from '@tiptap/extension-placeholder';
import { Editor, useEditor as useTipTap } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';

export const useEditor = ({ ...rhfMethods }) => {
  const { setValue, trigger } = rhfMethods

  const editor = useTipTap({
    extensions: [
      Document.extend({
        content: '(block|columns)+',
      }),
      StarterKit.configure({
        codeBlock: false
      }),
      Placeholder.configure({
        placeholder: "What's your story?",
        showOnlyWhenEditable: false
      }),
    ],
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        class: 'min-h-full',
      },
    },
    onUpdate({ editor }) {
      const val = editor.getHTML()
      setValue('content', val && !editor.isEmpty ? val : '')
      ;(async () => await trigger('content'))()
    }
  })

  return { editor: editor as Editor }
};