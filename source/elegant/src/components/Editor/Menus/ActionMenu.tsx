import { Editor } from '@tiptap/react';
import { useEffect, useState } from 'react';
import { Toolbar } from '../Toolbar/Toolbar';
import useContentItemActions from '@/utils/Hooks/useContentItemActions';
import { useData } from '@/utils/Hooks/useEditorData';
import * as Popover from '@radix-ui/react-popover';
import { Surface } from '../Toolbar/Surface';
import { DropdownButton } from '../Toolbar/Dropdown';
import { Plus, GripVertical, RemoveFormatting, Clipboard, Copy, Trash2 } from 'lucide-react';

export type Props = {
    /**
     * The TipTap Editor.
     */
    editor: Editor
};

export default function ActionMenu({ editor }: Props){
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useData();
  const actions = useContentItemActions(editor, data.currentNode, data.currentNodePos);

  // useEffect(() => {
  //   if (menuOpen) {
  //     editor.commands.setMeta('lockDragHandle', true)
  //   } else {
  //     editor.commands.setMeta('lockDragHandle', false)
  //   }
  // }, [editor, menuOpen])

  return (
    <>
      <div className="flex items-center gap-0.5">
        <Toolbar.Button onClick={actions.handleAdd}>
          <Plus className='w-4 h-4' strokeWidth={2.5}/>
        </Toolbar.Button>
        <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Popover.Trigger asChild>
            <Toolbar.Button>
              <GripVertical className='w-4 h-4' strokeWidth={2.5}/>
            </Toolbar.Button>
          </Popover.Trigger>
          <Popover.Content side="bottom" align="start" sideOffset={8}>
            <Surface className="p-2 flex flex-col min-w-[16rem]">
              <Popover.Close>
                <DropdownButton onClick={actions.resetTextFormatting}>
                  <RemoveFormatting className='w-4 h-4' strokeWidth={2.5}/>
                  Clear formatting
                </DropdownButton>
              </Popover.Close>
              <Popover.Close>
                <DropdownButton onClick={actions.copyNodeToClipboard}>
                  <Clipboard className='w-4 h-4' strokeWidth={2.5}/>
                  Copy to clipboard
                </DropdownButton>
              </Popover.Close>
              <Popover.Close>
                <DropdownButton onClick={actions.duplicateNode}>
                  <Copy className='w-4 h-4' strokeWidth={2.5}/>
                  Duplicate
                </DropdownButton>
              </Popover.Close>
              <Toolbar.Divider horizontal />
              <Popover.Close>
                <DropdownButton
                  onClick={actions.deleteNode}
                  className="text-red-500 bg-red-500 dark:text-red-500 hover:bg-red-500 dark:hover:text-red-500 dark:hover:bg-red-500 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20"
                >
                  <Trash2 className='w-4 h-4' strokeWidth={2.5}/>
                  Delete
                </DropdownButton>
              </Popover.Close>
            </Surface>
          </Popover.Content>
        </Popover.Root>
      </div>
    </>
  )
}