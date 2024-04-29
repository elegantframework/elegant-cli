import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { convert } from 'url-slug';
import Accordion from '../Accordion';
import DateTimePicker from '../DateTimePicker';
import DeleteDocumentButton from '../DeleteDocumentButton';
import Input from '../Input';
import TextArea from '../TextArea';
import DocumentSettingsImageSelection from '../DocumentSettingsImageSelection';
import {
  CustomFieldArrayValue,
  CustomFields,
  isArrayCustomField
} from '@/types/Index';
import { DocumentContext } from '@/utils/Context';

type DocumentSettingsProps = {
  saveFunc: () => void;
  loading: boolean;
  registerOptions?: RegisterOptions;
  showDelete: boolean;
  customFields?: CustomFields;
};

interface InputProps {
  type?: 'text' | 'number';
  suggestions?: CustomFieldArrayValue[];
};

type ComponentType = {
  component: typeof Input | typeof TextArea;
  props: InputProps;
};

type FieldDataMapType = {
  String: ComponentType;
  Text: ComponentType;
  Number: ComponentType;
};

const FieldDataMap: FieldDataMapType = {
  String: { component: Input, props: { type: 'text' } },
  Text: { component: TextArea, props: {} },
  Number: { component: Input, props: { type: 'number' } }
};

export default function DocumentSettings({
  saveFunc,
  loading,
  registerOptions,
  showDelete,
  customFields = {}
}: DocumentSettingsProps) {
  const { register, formState: { errors }} = useFormContext();
  const router = useRouter();
  const { document, editDocument, hasChanges, collection } = useContext(DocumentContext);
  let [ tagInput, setTagInput ] = useState("");
  let [ newTags, setNewTags ] = useState<string[]>([]);
  let tagsLoaded = false;

  useEffect(() => {
    if(document.tags && !tagsLoaded) {
      setNewTags(document.tags);
      tagsLoaded = true;
    }
  }, [document.tags]);

  return (
    <aside className="relative w-full border-b border-gray-300 bg-white md:w-64 md:flex-none md:flex-col md:flex-wrap md:items-start md:justify-start md:border-b-0 md:border-l md:py-6 max-h-[calc(100vh-53px)] scrollbar-hide overflow-scroll">
      <div className="relative hidden w-full items-center justify-between md:mb-4 md:flex px-4">
        <DateTimePicker
          id="publishedAt"
          label="Date"
          date={document.publishedAt}
          setDate={(publishedAt) => editDocument('publishedAt', publishedAt)}
        />
      </div>
      <div className="relative hidden w-full items-center justify-between md:mb-4 md:flex px-4">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-900"
        >
          Status
        </label>
        <select
          {...register('status', registerOptions)}
          name="status"
          id="status"
          defaultValue={document.status}
          className="block cursor-pointer appearance-none rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <div
        className={`flex w-full pb-4 px-4 ${
          showDelete ? 'justify-between items-center' : 'justify-end'
        }`}
      >
        {showDelete && (
          <DeleteDocumentButton
            disabled={loading}
            slug={document.slug}
            onComplete={() => {
              router.push(`/admin/${collection}`)
            }}
            collection={collection}
            className="hover:bg-slate-200 max-h-[2.25rem]"
          />
        )}
        <button
          onClick={saveFunc}
          type="button"
          disabled={loading || !hasChanges}
          className="mr-2 mb-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {loading ? (
            <>
              <svg
                className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving
            </>
          ) : (
            'Save'
          )}
        </button>
      </div>
      <div className="w-full">
        <Accordion title="Author">
          <Input
            label="Name"
            name="author.name"
            id="author.name"
            defaultValue={document.author?.name}
            inputSize="small"
            wrapperClass="mb-4"
          />
          <DocumentSettingsImageSelection
            label="Add an avatar"
            name="author.picture"
            description="Author Avatar"
          />
        </Accordion>
        <Accordion title="URL Slug">
          <Input
            label="Write a slug (optional)"
            name="slug"
            id="slug"
            defaultValue={document.slug}
            inputSize="small"
            registerOptions={{
              onChange: (e) => {
                const lastChar = e.target.value.slice(-1)
                editDocument(
                  'slug',
                  lastChar === ' ' || lastChar === '-'
                    ? e.target.value
                    : convert(e.target.value, { dictionary: { "'": '' } })
                )
              }
            }}
          />
        </Accordion>
        <Accordion title="Description">
          <TextArea
            name="description"
            type="textarea"
            label="Write a description (optional)"
            id="description"
            rows={5}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-indigo-500"
          />
        </Accordion>
        <Accordion title="Cover Image">
          <DocumentSettingsImageSelection
            name="coverImage"
            description="Cover Image"
          />
        </Accordion>
        <Accordion title="Tags">
          {newTags.map((tag) => (
            <span 
              className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 mr-2"
              key={`${tag}-tag`}
            >
              {tag}
              <button 
                className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
                onClick={() => {
                  setNewTags(
                    newTags.filter(e => e !== tag)
                  );

                  editDocument('tags', newTags.filter(e => e !== tag));
                }}
              >
                <span className="sr-only">Remove</span>
                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-700/50 group-hover:stroke-gray-700/75">
                  <path d="M4 4l6 6m0-6l-6 6" />
                </svg>
                <span className="absolute -inset-1" />
              </button>
            </span>
          ))}
          <div className='mt-2'>
            <label htmlFor="tag" className="block text-sm font-medium leading-6 text-gray-900">
              Add Tag
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <input
                  type="text"
                  name="tag"
                  id="add_tag"
                  className="block w-full rounded-none rounded-l-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-indigo-500"
                  onChange={(e) => {
                    setTagInput(e.target.value);
                  }}
                  value={tagInput}
                />
              </div>
              <button
                type="button"
                className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-indigo-300"
                disabled={!isAddTagButtonEnabled(
                  tagInput,
                  newTags
                )}
                onClick={() => {
                  setNewTags([...newTags, tagInput]);
                  editDocument('tags', [...newTags, tagInput]);
                  setTagInput("");
                }}
              >
                Add
              </button>
            </div>
          </div>
        </Accordion>
        {customFields &&
          Object.entries(customFields).map(([name, field]) => {
            const Field = FieldDataMap[field.fieldType]
            if (isArrayCustomField(field)) {
              Field.props.suggestions = field.values
            }
            return (
              <Accordion
                key={name}
                title={`${field.title}${field.required ? '*' : ''}`}
                error={!!errors[name]?.message}
              >
                <Field.component
                  id={name}
                  label={field.description}
                  {...Field.props}
                />
              </Accordion>
            )
          })}
      </div>
      <hr className="pb-16" />
    </aside>
  )
};

function isAddTagButtonEnabled(tag: string, currentTags: string[])
{
  if(tag !== "" && !currentTags.includes(tag))
  {
    return true;
  }

  return false;
}