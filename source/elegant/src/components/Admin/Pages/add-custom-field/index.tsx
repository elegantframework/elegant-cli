import { yupResolver } from '@hookform/resolvers/yup';
import camelCase from 'camelcase';
import { useContext, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useCreateCommitMutation } from '@/graphql/generated';
import {
  CustomField,
  CustomFields,
  customFieldTypes,
  isArrayCustomField
} from '@/types/Index';
import useFileQuery from '@/utils/Hooks/useFileQuery';
import useNavigationLock from '@/utils/Hooks/useNavigationLock';
import useOid from '@/utils/Hooks/useOid';
import { createCommit as createCommitApi } from '@/utils/createCommit';
import { CMSContext } from '@/utils/Context';
import AdminLayout from '@/components/Layouts/AdminLayout';
import Input from '@/components/Input';
import Alert from '@/components/Alert';
import Modal from '@/components/Modal';
import { TrashIcon } from '@brandonowens/elegant-ui';

type AddCustomFieldProps = {
  collection: string
}

type CustomFieldForm = CustomField<'string' | 'number' | 'array'> & {
  name: string
}

const fieldDataMap = {
  Text: 'string',
  String: 'string',
  Number: 'number',
  Tags: 'array'
} as const

export default function AddCustomField({ collection }: AddCustomFieldProps) {
  const {
    contentPath,
    monorepoPath,
    session,
    repoSlug,
    repoBranch,
    repoOwner
  } = useContext(CMSContext);
  const [createCommit] = useCreateCommitMutation()
  const fetchOid = useOid()
  const [hasChanges, setHasChanges] = useState(false)
  const [customFields, setCustomFields] = useState<CustomFields>({})
  const yupSchema = yup.object().shape({
    title: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field.')
      .required('Custom field name is required.'),
    fieldType: yup
      .string()
      .oneOf([...customFieldTypes])
      .required(),
    description: yup.string(),
    required: yup.boolean().required()
  })
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')
  const methods = useForm<CustomFieldForm>({
    mode: 'onChange',
    resolver: yupResolver(yupSchema)
  })
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { data: schemaQueryData, loading } = useFileQuery({
    file: `${collection}/schema.json`
  })
  const [selectedField, setSelectedField] = useState('')
  const [fieldName, setFieldName] = useState('')

  const capiHelper = async ({
    customFields,
    deleteField = false
  }: {
    customFields: any
    deleteField?: boolean
  }) => {
    const oid = await fetchOid()
    const customFieldsJSON = JSON.stringify(
      {
        title: collection,
        type: 'object',
        properties: { ...customFields }
      },
      null,
      2
    )

    const capi = createCommitApi({
      message: `feat(${collection}): ${
        deleteField ? 'delete' : 'add'
      } ${fieldName} field`,
      owner: repoOwner || session?.user?.login || '',
      oid: oid ?? '',
      name: repoSlug,
      branch: repoBranch
    })

    capi.replaceFile(
      `${
        monorepoPath
      }${contentPath}/${collection}/schema.json`,
      customFieldsJSON + '\n'
    )

    const input = capi.createInput()

    return await createCommit({ variables: { input } })
  }

  const onSubmit: SubmitHandler<CustomFieldForm> = async (
    data: CustomFieldForm
  ) => {
    setAdding(true)
    const { title, fieldType, ...rest } = data
    const fieldName = camelCase(title)

    if (!selectedField && customFields[fieldName]) {
      methods.setError('title', {
        type: 'manual',
        message: 'Field name is already taken.'
      })
      setAdding(false)
      return
    }

    try {
      customFields[fieldName] = {
        ...rest,
        fieldType,
        dataType: fieldDataMap[fieldType],
        title: data.title
      }

      // if (fieldDataMap[fieldType] === 'array') {
      //   customFields[fieldName] = {
      //     ...customFields[fieldName],
      //     // @ts-ignore
      //     values: data?.values || []
      //   }
      // }

      const created = await capiHelper({ customFields })

      if (created) {
        setCustomFields({ ...customFields })
      }
    } catch (error) {
      // TODO: Better error treatment
      setError('add')
      console.log({ error })
    }

    setHasChanges(false)
    setSelectedField('')
    setShowAddModal(false)
    setAdding(false)
  }

  const deleteField = async (name: string) => {
    setDeleting(true)

    try {
      let newCustomFields = { ...customFields }
      delete newCustomFields[name]
      const deleted = await capiHelper({
        customFields: newCustomFields,
        deleteField: true
      })

      if (deleted) {
        setCustomFields(newCustomFields)
      }
    } catch (error) {
      // TODO: Better error treatment
      setError('delete')
      console.log({ error })
    }
    setSelectedField('')
    setShowDeleteModal(false)
    setDeleting(false)
    setHasChanges(false)
  }

  useEffect(() => {
    const documentQueryObject = schemaQueryData?.repository?.object
    if (documentQueryObject?.__typename === 'Blob') {
      const schema = JSON.parse(documentQueryObject?.text || '{}')
      setCustomFields(schema.properties)
    }
  }, [schemaQueryData])

  useEffect(() => {
    const subscription = methods.watch(() => setHasChanges(true))
    return () => subscription.unsubscribe()
  }, [methods])

  // Ask for confirmation before leaving page if changes were made.
  useNavigationLock(hasChanges)

  return (
    <AdminLayout title="Add Custom Fields">
      <FormProvider {...methods}>
        <div className="mb-8 flex h-12 items-center">
          <h1 className="mr-12 text-2xl">
            <span className="capitalize">{collection}</span> Fields
          </h1>
          {Object.keys(customFields).length > 0 ? (
            <button
              type="button"
              onClick={() => {
                methods.reset()
                setShowAddModal(true)
              }}
            >
              <div className="mr-2 mb-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer">
                Add Custom Field
              </div>
            </button>
          ) : null}
        </div>
        {!loading ? (
          <>
            {Object.keys(customFields).length === 0 ? (
              <div className="max-w-2xl">
                <div className="relative">
                  <div className="mb-20 max-w-2xl p-8 px-4 md:p-8 text-black bg-white rounded-lg border border-gray-200 shadow-md prose prose-base">
                    <p>Here you can add Custom Fields to your collections.</p>
                    <p>
                      Create your first Custom Field by clicking the button
                      below.
                    </p>

                    <div
                      className="mr-2 mb-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer"
                      onClick={() => setShowAddModal(true)}
                    >
                      Add Custom Field
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="max-w-5xl w-full grid grid-cols-3 gap-6">
                  {customFields &&
                    Object.entries(customFields).map(([name, field]) => {
                      return (
                        <div
                          key={name}
                          className="relative flex p-6 justify-between items-center max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-slate-100"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              methods.reset()
                              setSelectedField(name)
                              setShowAddModal(true)
                            }}
                            className="text-left"
                          >
                            <span className="block text-xl cursor-pointer font-bold tracking-tight text-gray-900 capitalize hover:text-indigo-500 mb-2">
                              {field.title}
                              {/* This span allows for full card click */}
                              <span className="absolute top-0 bottom-0 left-0 right-16"></span>
                            </span>
                            <span className="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                              {field.fieldType}
                            </span>
                            {field.required ? (
                              <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                                required
                              </span>
                            ) : null}
                          </button>
                          <button
                            className="z-10 inline-block text-gray-500 hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
                            type="button"
                            onClick={() => {
                              setShowDeleteModal(true)
                              setSelectedField(name)
                            }}
                          >
                            <span className="sr-only">Delete content</span>
                            <TrashIcon />
                          </button>
                        </div>
                      )
                    })}
                </div>
              </>
            )}
          </>
        ) : null}
        {error ? (
          <div className="mt-8">
            <Alert type="error">
              <>
                <span className="font-medium">Oops!</span> We are unable to{' '}
                {error} your custom field.
              </>
            </Alert>
          </div>
        ) : null}
        {showAddModal && (
          <Modal
            title={
              selectedField
                ? `Edit ${customFields[selectedField].title}`
                : `Add Custom Field to ${collection}`
            }
            close={() => {
              setHasChanges(false)
              setSelectedField('')
              setShowAddModal(false)
            }}
          >
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {!!selectedField ? (
                <div className="pt-6 pl-6">
                  <Alert type="info">
                    <>
                      <span className="font-medium">Field name</span> and{' '}
                      <span className="font-medium">Field type</span> editing is
                      disabled to avoid data conflicts.
                    </>
                  </Alert>
                </div>
              ) : null}
              <div
                key={selectedField}
                className={`flex p-6 text-left gap-4 ${
                  !!selectedField
                    ? 'pt-0 opacity-50 cursor-not-allowed pointer-events-none hidden'
                    : ''
                }`}
              >
                <Input
                  label="Field name"
                  id="title"
                  inputSize="medium"
                  className="w-full max-w-sm md:w-80"
                  placeholder="Ex: Category"
                  type="text"
                  helperText="The name of the field"
                  readOnly={!!selectedField}
                  autoFocus={!selectedField}
                  defaultValue={
                    selectedField ? customFields[selectedField].title : ''
                  }
                  registerOptions={{
                    onChange: (e) => {
                      setFieldName(camelCase(e.target.value))
                    }
                  }}
                />
                <div className="mb-5">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Field type
                  </label>
                  <select
                    {...methods.register('fieldType')}
                    name="fieldType"
                    id="fieldType"
                    className="block cursor-pointer appearance-none rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={
                      selectedField
                        ? customFields[selectedField].fieldType
                        : 'String'
                    }
                  >
                    {customFieldTypes.map((type) => {
                      return (
                        <option
                          key={type}
                          value={type}
                          disabled={!!selectedField}
                        >
                          {type}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>

              <div className="flex px-6 text-left gap-4 mb-4">
                <Input
                  label="description"
                  id="description"
                  inputSize="medium"
                  className="w-full max-w-sm md:w-80"
                  placeholder="Ex: Add a category"
                  type="text"
                  helperText="This will be the label of the field"
                  defaultValue={
                    selectedField ? customFields[selectedField].description : ''
                  }
                />
                <fieldset>
                  <div className="flex mt-7">
                    <div className="flex items-center h-5">
                      <input
                        {...methods.register('required')}
                        id="required"
                        type="checkbox"
                        className="cursor-pointer w-4 h-4 text-indigo-600 bg-gray-100 rounded border-gray-300 focus:ring-indigo-500 focus:ring-2"
                        defaultChecked={
                          selectedField
                            ? customFields[selectedField].required
                            : false
                        }
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      <label
                        htmlFor="required"
                        className="cursor-pointer text-sm font-medium text-gray-900"
                      >
                        Required field
                      </label>
                      <p
                        id="helper-checkbox-text"
                        className="text-xs font-normal text-gray-500"
                      >
                        <span className="capitalize">{collection}</span>{' '}
                        documents will only be saved if this field is not empty
                      </p>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="space-x-2 rounded-b border-t p-6 text-sm text-gray-700">
                This field will be accessible on the frontend as:{'  '}
                <code className="bg-gray-200 font-semibold">
                  {selectedField ? selectedField : fieldName}
                </code>
              </div>
              <div className="flex items-center space-x-2 rounded-b border-t p-6">
                <button
                  type="submit"
                  disabled={adding}
                  className="flex rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none"
                >
                  {adding ? (
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
                      {selectedField ? 'Editing' : 'Adding'}
                    </>
                  ) : selectedField ? (
                    'Edit'
                  ) : (
                    'Add'
                  )}
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 order-gray-600 bg-gray-800 text-white hover:border-gray-600 hover:bg-gray-700 focus:ring-gray-700"
                  onClick={() => {
                    setHasChanges(false)
                    setSelectedField('')
                    setShowAddModal(false)
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}
        {showDeleteModal && (
          <Modal
            title={`Delete ${customFields[selectedField].title} Field`}
            close={() => {
              setShowDeleteModal(false)
              setSelectedField('')
            }}
          >
            <div className="space-y-6 p-6 text-left">
              <p className="text-base leading-relaxed text-gray-500">
                Are you sure you want to delete the{' '}
                {customFields[selectedField].title} field?
              </p>
              <p className="text-base leading-relaxed text-gray-500">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center space-x-2 rounded-b border-t p-6">
              <button
                type="button"
                disabled={deleting}
                className="flex rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none"
                onClick={() => {
                  setDeleting(true)
                  deleteField(selectedField)
                }}
              >
                {deleting ? (
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
                    Deleting
                  </>
                ) : (
                  'Delete'
                )}
              </button>
              <button
                type="button"
                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 order-gray-600 bg-gray-800 text-white hover:border-gray-600 hover:bg-gray-700 focus:ring-gray-700"
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedField('')
                }}
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
      </FormProvider>
    </AdminLayout>
  )
}
