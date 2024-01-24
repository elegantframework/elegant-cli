import CodeBlock from '@tiptap/extension-code-block';
import Figcaption from '@/components/Editor/Extensions/Figcaption'
import HorizontalRule from '@/components/Editor/Extensions/HorizontalRule'
import { ImageBlock } from '@/components/Editor/Extensions/ImageBlock'
import { ImageUpload } from '@/components/Editor/Extensions/ImageUpload'
import Link from '@/components/Editor/Extensions/Link'
import { Editor } from '@tiptap/react'

// import { AiWriter, AiImage, Figcaption, HorizontalRule, ImageBlock, ImageUpload, Link, CodeBlock } from '@/extensions'

export const isTableGripSelected = (node: HTMLElement) => {
  let container = node

  while (container && !['TD', 'TH'].includes(container.tagName)) {
    container = container.parentElement!
  }

  const gripColumn = container && container.querySelector && container.querySelector('a.grip-column.selected')
  const gripRow = container && container.querySelector && container.querySelector('a.grip-row.selected')

  if (gripColumn || gripRow) {
    return true
  }

  return false
}

export const isCustomNodeSelected = (editor: Editor, node: HTMLElement) => {
  const customNodes = [
    HorizontalRule.name,
    ImageBlock.name,
    ImageUpload.name,
    CodeBlock.name,
    ImageBlock.name,
    Link.name,
    Figcaption.name,
  ]

  return customNodes.some(type => editor.isActive(type)) || isTableGripSelected(node)
}

export default isCustomNodeSelected
