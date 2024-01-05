import Placeholder from '@tiptap/extension-placeholder';
import { Editor, useEditor as useTipTap } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Document } from '@tiptap/extension-document';
import Columns from '@/components/Editor/Extensions/Columns';
import Link from '@/components/Editor/Extensions/Link';
import Selection from '@/components/Editor/Extensions/Selection';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Column from '@/components/Editor/Extensions/Column';
import Heading from '@/components/Editor/Extensions/Heading';
import HorizontalRule from '@/components/Editor/Extensions/HorizontalRule';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family'
import { Typography } from '@tiptap/extension-typography'
import { Color } from '@tiptap/extension-color'
import lowlight from 'lowlight';
import FontSize from '@/components/Editor/Extensions/FontSize';
import { TrailingNode } from '@/components/Editor/Extensions/TrailingNode';

export const useEditor = ({ ...rhfMethods }) => {
  const { setValue, trigger } = rhfMethods

  const editor = useTipTap({
    extensions: [
      Document.extend({
        content: '(block|columns)+',
      }),
      Columns,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Column,
      Selection,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      HorizontalRule,
      StarterKit.configure({
        document: false,
        dropcursor: false,
        heading: false,
        horizontalRule: false,
        blockquote: false,
        history: false,
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: null,
      }),
      TextStyle,
      FontSize,
      FontFamily,
      Color,
      TrailingNode,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        includeChildren: true,
        showOnlyCurrent: false,
        placeholder: () => "What's your story?",
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