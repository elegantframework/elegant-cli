import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { singular } from 'pluralize';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomFields, FileType } from '@/types/Index';
import { Document } from '@/types/Document'
import { useCMSSession } from '@/utils/core/Auth/hooks';
import { deepReplace } from '@/utils/core/deepReplace';
import useNavigationLock from '@/utils/core/Hooks/useNavigationLock';
import useTipTap from '@/utils/core/Hooks/useTipTap';
import { convertSchemaToYup, editDocumentSchema } from '@/utils/core/yup';
import useFileQuery from '@/utils/core/Hooks/useFileQuery';
import useSubmitDocument from '@/utils/core/Hooks/useSubmitDocument';
import { useDocumentUpdateEffect } from '@/utils/core/Hooks/useDocumentUpdateEffect';
import { DocumentContext } from '@/utils/core/Context';
import AdminLayout from '@/components/core/AdminLayout';
import DocumentSettings from '@/components/core/DocumentSettings';
import DocumentTitleInput from '@/components/core/DocumentTitleInput';
import MDEditor from '@/components/core/MDEditor';

export default function EditDocument({ collection }: { collection: string }) {
  const router = useRouter()
  const [slug, setSlug] = useState(router.query?.cms?.[1] as string)
  const { session } = useCMSSession()
  const [loading, setLoading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [files, setFiles] = useState<FileType[]>([])
  const [showDelete, setShowDelete] = useState(false)
  const [documentSchema, setDocumentSchema] = useState(editDocumentSchema)
  const methods = useForm<Document>({ resolver: yupResolver(documentSchema) })
  const { editor } = useTipTap({ ...methods })
  const [customFields, setCustomFields] = useState<CustomFields>({})

  const editDocument = (property: string, value: any) => {
    const formValues = methods.getValues()
    const newValue = deepReplace(formValues, property, value)
    methods.reset(newValue)
  }

  const { data: schemaQueryData } = useFileQuery({
    file: `${collection}/schema.json`
  })

  const onSubmit = useSubmitDocument({
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
    setHasChanges
  })

  useEffect(() => {
    router.push(`/admin/${collection}/${slug}`, undefined, {
      shallow: true
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  useDocumentUpdateEffect({
    collection,
    methods,
    slug,
    editor,
    session,
    setHasChanges,
    setShowDelete
  })

  useEffect(() => {
    const documentQueryObject = schemaQueryData?.repository?.object
    if (documentQueryObject?.__typename === 'Blob') {
      const schema = JSON.parse(documentQueryObject?.text || '{}')
      const yupSchema = convertSchemaToYup(schema)
      setDocumentSchema(yupSchema)
      setCustomFields(schema.properties)
    }
  }, [schemaQueryData])

  // Ask for confirmation before leaving page if changes were made.
  useNavigationLock(hasChanges)

  return (
    <>
      <DocumentContext.Provider
        value={{
          editor,
          document: methods.getValues(),
          editDocument,
          files,
          setFiles,
          hasChanges,
          collection
        }}
      >
        <FormProvider {...methods}>
          <AdminLayout
            title={methods.getValues('title')}
            settings={
              <DocumentSettings
                loading={loading}
                saveFunc={methods.handleSubmit(onSubmit)}
                showDelete={showDelete}
                customFields={customFields}
              />
            }
          >
            <form className="m-auto max-w-[700px] space-y-4">
              <DocumentTitleInput
                id="title"
                className="w-full resize-none outline-none bg-transparent text-5xl scrollbar-hide min-h-[55px] overflow-hidden"
                placeholder={`Your ${singular(collection)} title`}
              />
              <div className="min-h-full prose prose-xl">
                <MDEditor editor={editor} id="content" />
              </div>
            </form>
          </AdminLayout>
        </FormProvider>
      </DocumentContext.Provider>
    </>
  )
}
