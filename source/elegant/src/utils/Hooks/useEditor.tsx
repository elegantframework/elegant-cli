import Placeholder from '@tiptap/extension-placeholder';
import { Editor, useEditor as useTipTap } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Document } from '@tiptap/extension-document';
import Link from '@/components/Editor/Extensions/Link';
import Selection from '@/components/Editor/Extensions/Selection';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Heading from '@/components/Editor/Extensions/Heading';
import HorizontalRule from '@/components/Editor/Extensions/HorizontalRule';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family';
import { Typography } from '@tiptap/extension-typography';
import { Color } from '@tiptap/extension-color';
import FontSize from '@/components/Editor/Extensions/FontSize';
import { TrailingNode } from '@/components/Editor/Extensions/TrailingNode';
import { Highlight } from '@tiptap/extension-highlight';
import { Underline } from '@tiptap/extension-underline';
import { TextAlign } from '@tiptap/extension-text-align';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import SlashCommand from '@/components/Editor/Extensions/SlashCommand';
import { FocusClasses as Focus } from '@tiptap/extension-focus';
import Figcaption from '@/components/Editor/Extensions/Figcaption';
import BlockquoteFigure from '@/components/Editor/Extensions/BlockquoteFigure';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { lowlight } from 'lowlight/lib/common';
import { Column, Columns } from '@/components/Editor/Extensions/MultiColumn';
import { Table, TableCell, TableHeader, TableRow } from '@/components/Editor/Extensions/Table';
import { ImageBlock } from '@/components/Editor/Extensions/ImageBlock';
import { Youtube } from '@tiptap/extension-youtube';
import { ImageUpload } from '@/components/Editor/Extensions/ImageUpload';
import Image from '@tiptap/extension-image';
import { Markdown } from 'tiptap-markdown';

export const useEditor = ({ ...rhfMethods }) => {
  const { setValue, trigger } = rhfMethods

  const editor = useTipTap({
    autofocus: true,
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
      // FontSize,
      // FontFamily,
      Color,
      TrailingNode,
      Link.configure({
        openOnClick: false,
      }),
      Highlight.configure({ multicolor: true }),
      Underline,
      Image.extend({
        renderHTML({ HTMLAttributes }) {
          return [
             'div',
            {class: "my-8 shadow-xl rounded-xl"},
            [
              'img',
              {
                class: "rounded-xl",
                ...HTMLAttributes
              }
            ]
          ]
        }
      }).configure({inline: true}),
      ImageUpload,
      ImageBlock,
      // FileHandler.configure({
      //   allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
      //   onDrop: (currentEditor, files, pos) => {
      //     files.forEach(async () => {
      //       const url = await API.uploadImage()
    
      //       currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run()
      //     })
      //   },
      //   onPaste: (currentEditor, files) => {
      //     files.forEach(async () => {
      //       const url = await API.uploadImage()
    
      //       return currentEditor
      //         .chain()
      //         .setImageBlockAt({ pos: currentEditor.state.selection.anchor, src: url })
      //         .focus()
      //         .run()
      //     })
      //   },
      // }),
      Markdown,
      TextAlign.extend({
        addKeyboardShortcuts() {
          return {}
        },
      }).configure({
        types: ['heading', 'paragraph'],
      }),
      Subscript,
      Superscript,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Typography,
      Placeholder.configure({
        showOnlyWhenEditable: false,
        placeholder: () => "What's your story?",
      }),
      SlashCommand,
      Focus,
      Figcaption,
      BlockquoteFigure,
      Dropcursor.configure({
        width: 2,
        class: 'ProseMirror-dropcursor border-black',
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: 'w-full',
        },
      })
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