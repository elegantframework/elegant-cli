import { useCallback, useContext } from 'react';
import {
  CustomFieldArrayValue,
  CustomFields,
  FileType,
  Session,
  isArrayCustomField
} from '@/types/Index';
import { Document } from '@/types/Document';
import { createCommit as createCommitApi } from '@/utils/createCommit';
import { assertUnreachable } from '../assertUnreachable';
import matter from 'gray-matter';
import { useCreateCommitMutation } from '@/graphql/generated';
import { UseFormReturn } from 'react-hook-form';
import useOid from './useOid';
import { CMSContext } from '../Context';
import MergeMarkdownData from '../Editor/MergeMarkdownData';
import { Editor } from '@tiptap/react';

type SubmitDocumentProps = {
  session: Session | null
  slug: string
  setSlug: (slug: string) => void
  setShowDelete: (showDelete: boolean) => void
  setLoading: (loading: boolean) => void
  files: FileType[]
  methods: UseFormReturn<Document, any>
  collection: string
  customFields: CustomFields
  setCustomFields: (customFields: CustomFields) => void
  setHasChanges: (hasChanges: boolean) => void,
  editor: Editor
}

function useSubmitDocument({
  session,
  slug,
  setSlug,
  setShowDelete,
  setLoading,
  files,
  methods,
  collection,
  customFields,
  setCustomFields,
  setHasChanges,
  editor
}: SubmitDocumentProps) {
  const [createCommit] = useCreateCommitMutation()
  const { 
    repoOwner, 
    repoSlug, 
    repoBranch, 
    contentPath, 
    monorepoPath 
  } = useContext(CMSContext);
  const fetchOid = useOid();

  const onSubmit = useCallback(
    async (data: Document) => {
      setLoading(true)

      try {
        const document = methods.getValues();

        const editorContent = editor.storage.markdown.getMarkdown();
        let content = MergeMarkdownData({ ...data, content: editorContent });

        const oid = await fetchOid();
        const owner = repoOwner || session?.user?.login || '';
        const newSlug = document.slug;

        // If the slug has changed, commit should delete old file
        const oldSlug = slug !== newSlug && slug !== 'new' ? slug : undefined;

        const capi = createCommitApi({
          message: oldSlug
            ? `chore: Updates ${newSlug} formerly ${oldSlug}`
            : `chore: Updates/Creates ${newSlug}`,
          owner,
          oid: oid ?? '',
          name: repoSlug,
          branch: repoBranch
        });

        if (oldSlug) {
          capi.removeFile(
            `${
              monorepoPath
            }${contentPath}/${collection}/${oldSlug}.mdx`
          );
        }

        if (files.length > 0) {
          files.forEach(({ filename, blob, type, content: fileContents }) => {

            // check if blob is still in the document before adding file to the commit
            if (blob && content.search(blob) !== -1) {

              const randString = window
                .btoa(Math.random().toString())
                .substring(10, 6)
              const newFilename = filename
                .toLowerCase()
                .replace(/[^a-zA-Z0-9-_\.]/g, '-')
                .replace(/(\.[^\.]*)?$/, `-${randString}$1`)

              const filePath = (() => {
                switch (type) {
                  case 'images':
                    return "images";
                  default:
                    assertUnreachable(type)
                }
              })()

              capi.replaceFile(
                `${
                  monorepoPath
                }public/${filePath}/${newFilename}`,
                fileContents,
                false
              )

              // replace blob in content with path
              content = content.replace(blob, `/${filePath}/${newFilename}`)
            }
          })
        }

        const { data: matterData } = matter(content)

        capi.replaceFile(
          `${
            monorepoPath
          }${contentPath}/${collection}/${newSlug}.mdx`,
          content
        )

        // Check if a new tag value was added
        let hasNewTag = false
        Object.entries(customFields).forEach(([key, field]) => {
          const customField = customFields[key]
          //@ts-ignore
          let dataKey = data[key]
          // Only check for new values in array fields
          if (isArrayCustomField(field) && isArrayCustomField(customField)) {
            // If the metadata value is not an array, set it to an empty array
            if (!Array.isArray(dataKey)) {
              matterData[key] = []
              return
            }

            dataKey.forEach((selectedTag: CustomFieldArrayValue) => {
              // Check if the selected tag already exists
              const exists = field.values.some(
                (savedTag: CustomFieldArrayValue) =>
                  savedTag.value === selectedTag.value
              )

              // If the selected tag does not exist, add it
              if (!exists) {
                customField.values.push({
                  value: selectedTag.value,
                  label: selectedTag.label
                })
                customFields[key] = customField
                setCustomFields({ ...customFields })
                hasNewTag = true
              }
            })
          }
        })

        if (hasNewTag) {
          const customFieldsJSON = JSON.stringify(
            {
              title: collection,
              type: 'object',
              properties: { ...customFields }
            },
            null,
            2
          )

          capi.replaceFile(
            `${
              monorepoPath
            }${contentPath}/${collection}/schema.json`,
            customFieldsJSON + '\n'
          )
        }

        const input = capi.createInput()

        await createCommit({
          variables: {
            input
          }
        })
        setLoading(false)
        setHasChanges(false)
        setSlug(newSlug)
        setShowDelete(true)
      } catch (error) {
        // TODO: Better error treatment
        setLoading(false)
        console.log({ error })
      }
    },
    [
      repoOwner,
      session,
      slug,
      setSlug,
      setShowDelete,
      setLoading,
      files,
      createCommit,
      fetchOid,
      methods,
      monorepoPath,
      contentPath,
      collection,
      customFields,
      setCustomFields,
      repoSlug,
      repoBranch,
      setHasChanges,
      editor
    ]
  )

  return onSubmit
}

export default useSubmitDocument
