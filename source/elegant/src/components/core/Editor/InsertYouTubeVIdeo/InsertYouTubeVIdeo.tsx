import { Editor } from '@tiptap/react';
import { ChangeEvent, useCallback, useContext, useState } from 'react';
import { FileType } from '@/types/Index';
import { DocumentContext } from '@/utils/core/Context';
import MenuButton from '../MenuButton/MenuButton';

interface Props {
  editor: Editor;
  setYoutubeMenu: (value: boolean) => void;
}

const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString))
  } catch (e) {
    return false
  }
}

export default function InsertYouTubeVIdeo({ editor, setYoutubeMenu }: Props) {

  return (
    <div className="flex w-[500px] rounded-sm border border-black outline-none bg-white">
      <div className='flex max-h-[40px]'>
        <MenuButton
          onClick={() => setYoutubeMenu(false)}
          editor={editor}
          name="back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" />
          </svg>
        </MenuButton>
      </div>
      <div className='mx-auto w-full max-w-xl'>
        <div className='relative'>
          <div className="overflow-hidden">
            <label htmlFor="url" className="sr-only">
              YouTube Url
            </label>
            <input
              type="text"
              name="url"
              id="url"
              className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
              placeholder="YouTube Url"
            /> 
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
              placeholder="Title"
            />
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <textarea
              rows={2}
              name="description"
              id="description"
              className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Write a description..."
              defaultValue={''}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div aria-hidden="true">
              <div className="py-2">
                <div className="h-9" />
              </div>
              <div className="h-px" />
              <div className="py-2">
                <div className="py-px">
                  <div className="h-9" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};